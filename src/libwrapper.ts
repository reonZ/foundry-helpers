import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
import { MODULE, R } from ".";

export function registerWrapper(
    type: libWrapper.RegisterType,
    path: string | string[],
    callback: libWrapper.RegisterCallback,
    context?: WrapperContext,
): number[] {
    const ids: number[] = [];
    const paths = R.isArray(path) ? path : [path];

    const wrapped = context
        ? function (this: any, ...args: any[]) {
              args.unshift(this);
              return callback.apply(context, args);
          }
        : callback;

    for (const key of paths) {
        const id = libWrapper.register(MODULE.id, key, wrapped, type);
        ids.push(id);
    }

    return ids;
}

export function unregisterWrapper(id: number | number[]) {
    const ids = R.isArray(id) ? id : [id];

    for (const id of ids) {
        libWrapper.unregister(MODULE.id, id);
    }
}

export class ToggleableWrapper {
    #callback: libWrapper.RegisterCallback;
    #ids: number[] | null = null;
    #options: WrapperOptions;
    #path: string | string[];
    #type: libWrapper.RegisterType;

    constructor(
        type: libWrapper.RegisterType,
        path: string | string[],
        callback: libWrapper.RegisterCallback,
        options: WrapperOptions = {},
    ) {
        this.#callback = callback;
        this.#options = options;
        this.#path = path;
        this.#type = type;
    }

    get enabled(): boolean {
        return !!this.#ids?.length;
    }

    activate() {
        if (this.enabled) return;

        this.#ids = registerWrapper(this.#type, this.#path, this.#callback, this.#options.context);
        this.#options.onActivate?.();
    }

    disable() {
        if (!this.#ids?.length) return;

        unregisterWrapper(this.#ids);
        this.#ids = null;
        this.#options.onDisable?.();
    }

    toggle(enabled: boolean = !this.enabled) {
        if (enabled) {
            this.activate();
        } else {
            this.disable();
        }
    }
}

export class ToggleableCreatureSheetWrapper extends ToggleableWrapper {
    constructor(
        type: libWrapper.RegisterType,
        partialPath: string | string[],
        callback: libWrapper.RegisterCallback,
        options: WrapperOptions = {},
    ) {
        const partials = R.isArray(partialPath) ? partialPath : [partialPath];
        const paths = partials.flatMap((partial) => [
            `CONFIG.Actor.sheetClasses.character['pf2e.CharacterSheetPF2e'].cls.prototype.${partial}`,
            `CONFIG.Actor.sheetClasses.npc['pf2e.NPCSheetPF2e'].cls.prototype.${partial}`,
            `CONFIG.Actor.sheetClasses.familiar['pf2e.FamiliarSheetPF2e'].cls.prototype.${partial}`,
        ]);

        super(type, paths, callback, options);
    }
}

export class SharedWrappersContainer<
    TDocument extends ClientDocument,
    TWrapperCallback extends libWrapper.RegisterCallback,
    TListener extends (...args: any[]) => any,
> {
    #path: string;
    #registered: ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener>[] = [];
    #sharedIds: number[] | null = null;
    #type: SharedType;
    #sharedWrapper: (
        this: TDocument,
        wrapped: libWrapper.RegisterCallback,
        ...wrapperArgs: Parameters<TWrapperCallback>
    ) => void;

    constructor(
        type: SharedType,
        path: string,
        sharedCallback: SharedCallback<TDocument, TWrapperCallback, TListener>,
    ) {
        this.#path = path;
        this.#type = type;

        const thisRegistered = this.#registered;

        function sharedWrapper(
            this: TDocument,
            wrapped: libWrapper.RegisterCallback,
            ...wrapperArgs: Parameters<TWrapperCallback>
        ) {
            const registered: TListener[] = R.pipe(
                thisRegistered,
                R.sortBy(R.prop("priority")),
                R.filter(({ active }) => active),
                R.map(({ listener, context }): TListener => {
                    if (context) {
                        return ((...args: any[]) => listener.call(context, this, ...args)) as TListener;
                    } else {
                        return ((...args: any[]) => listener.call(this, ...args)) as TListener;
                    }
                }),
            );

            return sharedCallback.call(this, registered, () => wrapped(...wrapperArgs), wrapperArgs);
        }

        this.#sharedWrapper = sharedWrapper;
    }

    activate() {
        if (this.#sharedIds) return;
        this.#sharedIds = registerWrapper(this.#type, this.#path, this.#sharedWrapper);
    }

    disable() {
        if (this.#sharedIds && !this.#registered.some((wrapper) => wrapper.active)) {
            unregisterWrapper(this.#sharedIds);
            this.#sharedIds = null;
        }
    }

    register(
        listener: (document: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>,
        options: { context: WrapperContext; priority?: number },
    ): ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener>;
    register(
        listener: (this: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>,
        options?: { context?: undefined; priority?: number },
    ): ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener>;
    register(
        listener: libWrapper.RegisterCallback,
        { context, priority = 0 }: { context?: WrapperContext; priority?: number } = {},
    ): ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener> {
        const wrapper = new ToggleableSharedWrapper(this, listener, context, priority);
        this.#registered.push(wrapper);
        return wrapper;
    }
}

class ToggleableSharedWrapper<
    TDocument extends ClientDocument,
    TWrapperCallback extends libWrapper.RegisterCallback,
    TListener extends (...args: any[]) => any,
> {
    #active: boolean = false;
    #context: any;
    #listener: libWrapper.RegisterCallback;
    #parent: SharedWrappersContainer<TDocument, TWrapperCallback, TListener>;
    #priority: number;

    constructor(
        parent: SharedWrappersContainer<TDocument, TWrapperCallback, TListener>,
        listener: libWrapper.RegisterCallback,
        context: WrapperContext | undefined,
        priority: number,
    ) {
        this.#context = context;
        this.#listener = listener;
        this.#parent = parent;
        this.#priority = priority;
    }

    get parent(): SharedWrappersContainer<TDocument, TWrapperCallback, TListener> {
        return this.#parent;
    }

    get active(): boolean {
        return this.#active;
    }

    get context() {
        return this.#context;
    }

    get listener() {
        return this.#listener;
    }

    get priority() {
        return this.#priority;
    }

    activate() {
        this.parent.activate();
        this.#active = true;
    }

    disable() {
        this.#active = false;
        this.parent.disable();
    }

    toggle(enabled: boolean = !this.active) {
        if (enabled) {
            this.activate();
        } else {
            this.disable();
        }
    }
}

type WrapperOptions = {
    context?: WrapperContext;
    onDisable?: () => void;
    onActivate?: () => void;
};

type SharedType = Exclude<libWrapper.RegisterType, "OVERRIDE">;
type SharedCallback<
    TDocument extends ClientDocument = ClientDocument,
    TWrapperCallback extends libWrapper.RegisterCallback = libWrapper.RegisterCallback,
    TListener extends (...args: any[]) => any = (...args: any[]) => any,
> = (
    this: TDocument,
    registered: TListener[],
    wrapped: () => ReturnType<TWrapperCallback>,
    args: Parameters<TWrapperCallback>,
) => void;

type WrapperContext = InstanceType<new (...args: any[]) => any>;

export type { ToggleableSharedWrapper };
