export function registerUpstreamHook(event: string, listener: RegisterHookCallback, once?: boolean) {
    const id = Hooks[once ? "once" : "on"](event, listener);
    const hook = Hooks.events[event].findSplice((x) => x.id === id);

    if (hook) {
        Hooks.events[event].unshift(hook);
    }

    return id;
}

export class ToggleableHook {
    #hooks: string[];
    #ids: { id: number; path: string }[] = [];
    #listener: RegisterHookCallback;
    #options: HookOptions;

    constructor(hook: string | string[], listener: RegisterHookCallback, options: HookOptions = {}) {
        this.#hooks = Array.isArray(hook) ? hook : [hook];
        this.#listener = listener;
        this.#options = options;
    }

    get enabled(): boolean {
        return this.#ids.length > 0;
    }

    activate() {
        if (this.enabled) return;

        for (const path of this.#hooks) {
            const id = this.#options.upstream
                ? registerUpstreamHook(path, this.#listener)
                : Hooks.on(path, this.#listener);

            this.#ids.push({ id, path });
        }

        this.#options.onActivate?.();
    }

    disable() {
        if (!this.enabled) return;

        for (const { path, id } of this.#ids) {
            Hooks.off(path, id);
        }

        this.#ids.length = 0;

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

export function executeWhenReady(fn: () => void) {
    if (game.ready) {
        fn();
    } else {
        Hooks.once("ready", fn);
    }
}

export type RegisterHookCallback = (...args: any[]) => any;

export type HookOptions = {
    onDisable?: () => void;
    onActivate?: () => void;
    upstream?: boolean;
};
