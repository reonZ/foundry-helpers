function registerUpstreamHook(event: string, listener: RegisterHookCallback, once?: boolean) {
    const id = Hooks[once ? "once" : "on"](event, listener);
    const hook = Hooks.events[event].findSplice((x) => x.id === id);

    if (hook) {
        Hooks.events[event].unshift(hook);
    }

    return id;
}

function createToggleHook(
    hook: string | string[],
    listener: RegisterHookCallback,
    options: HookOptions = {},
): ToggleHook {
    const _ids: { id: number; path: string }[] = [];
    const _hook = Array.isArray(hook) ? hook : [hook];

    return {
        get enabled(): boolean {
            return _ids.length > 0;
        },
        activate() {
            if (this.enabled) return;

            for (const path of _hook) {
                const id = options.upstream ? registerUpstreamHook(path, listener) : Hooks.on(path, listener);

                _ids.push({ id, path });
            }

            options.onActivate?.();
        },
        disable() {
            if (!this.enabled) return;

            for (const { path, id } of _ids) {
                Hooks.off(path, id);
            }

            _ids.length = 0;

            options.onDisable?.();
        },
        toggle(enabled?: boolean) {
            enabled ??= !this.enabled;

            if (enabled) {
                this.activate();
            } else {
                this.disable();
            }
        },
    };
}

function executeWhenReady(fn: () => void) {
    if (game.ready) {
        fn();
    } else {
        Hooks.once("ready", fn);
    }
}

type ToggleHook = {
    get enabled(): boolean;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
};

type RegisterHookCallback = (...args: any[]) => any;

type HookOptions = {
    onDisable?: () => void;
    onActivate?: () => void;
    upstream?: boolean;
};

export { createToggleHook, executeWhenReady, registerUpstreamHook };
export type { HookOptions, ToggleHook };
