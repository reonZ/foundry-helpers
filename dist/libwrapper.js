import { MODULE, R } from ".";
export function registerWrapper(type, path, callback, context) {
    const ids = [];
    const paths = R.isArray(path) ? path : [path];
    const wrapped = context
        ? function (...args) {
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
export function unregisterWrapper(id) {
    const ids = R.isArray(id) ? id : [id];
    for (const id of ids) {
        libWrapper.unregister(MODULE.id, id);
    }
}
export class ToggleableWrapper {
    #callback;
    #ids = null;
    #options;
    #path;
    #type;
    constructor(type, path, callback, options = {}) {
        this.#callback = callback;
        this.#options = options;
        this.#path = path;
        this.#type = type;
    }
    get enabled() {
        return !!this.#ids?.length;
    }
    activate() {
        if (this.enabled)
            return;
        this.#ids = registerWrapper(this.#type, this.#path, this.#callback, this.#options.context);
        this.#options.onActivate?.();
    }
    disable() {
        if (!this.#ids?.length)
            return;
        unregisterWrapper(this.#ids);
        this.#ids = null;
        this.#options.onDisable?.();
    }
    toggle(enabled = !this.enabled) {
        if (enabled) {
            this.activate();
        }
        else {
            this.disable();
        }
    }
}
export class ToggleableCreatureSheetWrapper extends ToggleableWrapper {
    constructor(type, partialPath, callback, options = {}) {
        const partials = R.isArray(partialPath) ? partialPath : [partialPath];
        const paths = partials.flatMap((partial) => [
            `CONFIG.Actor.sheetClasses.character['pf2e.CharacterSheetPF2e'].cls.prototype.${partial}`,
            `CONFIG.Actor.sheetClasses.npc['pf2e.NPCSheetPF2e'].cls.prototype.${partial}`,
            `CONFIG.Actor.sheetClasses.familiar['pf2e.FamiliarSheetPF2e'].cls.prototype.${partial}`,
        ]);
        super(type, paths, callback, options);
    }
}
export class SharedWrappersContainer {
    #path;
    #registered = [];
    #sharedIds = null;
    #type;
    #sharedWrapper;
    constructor(type, path, sharedCallback) {
        this.#path = path;
        this.#type = type;
        const thisRegistered = this.#registered;
        function sharedWrapper(wrapped, ...wrapperArgs) {
            const registered = R.pipe(thisRegistered, R.sortBy(R.prop("priority")), R.filter(({ active }) => active), R.map(({ listener, context }) => {
                if (context) {
                    return ((...args) => listener.call(context, this, ...args));
                }
                else {
                    return ((...args) => listener.call(this, ...args));
                }
            }));
            return sharedCallback.call(this, registered, () => wrapped(...wrapperArgs), wrapperArgs);
        }
        this.#sharedWrapper = sharedWrapper;
    }
    activate() {
        if (this.#sharedIds)
            return;
        this.#sharedIds = registerWrapper(this.#type, this.#path, this.#sharedWrapper);
    }
    disable() {
        if (this.#sharedIds && !this.#registered.some((wrapper) => wrapper.active)) {
            unregisterWrapper(this.#sharedIds);
            this.#sharedIds = null;
        }
    }
    register(listener, { context, priority = 0 } = {}) {
        const wrapper = new ToggleableSharedWrapper(this, listener, context, priority);
        this.#registered.push(wrapper);
        return wrapper;
    }
}
class ToggleableSharedWrapper {
    #active = false;
    #context;
    #listener;
    #parent;
    #priority;
    constructor(parent, listener, context, priority) {
        this.#context = context;
        this.#listener = listener;
        this.#parent = parent;
        this.#priority = priority;
    }
    get parent() {
        return this.#parent;
    }
    get active() {
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
    toggle(enabled = !this.active) {
        if (enabled) {
            this.activate();
        }
        else {
            this.disable();
        }
    }
}
