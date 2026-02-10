export function registerUpstreamHook(event, listener, once) {
    const id = Hooks[once ? "once" : "on"](event, listener);
    const hook = Hooks.events[event].findSplice((x) => x.id === id);
    if (hook) {
        Hooks.events[event].unshift(hook);
    }
    return id;
}
export function createToggleableHook(hook, listener, options = {}) {
    const _ids = [];
    const _hook = Array.isArray(hook) ? hook : [hook];
    return {
        get enabled() {
            return _ids.length > 0;
        },
        activate() {
            if (this.enabled)
                return;
            for (const path of _hook) {
                const id = options.upstream ? registerUpstreamHook(path, listener) : Hooks.on(path, listener);
                _ids.push({ id, path });
            }
            options.onActivate?.();
        },
        disable() {
            if (!this.enabled)
                return;
            for (const { path, id } of _ids) {
                Hooks.off(path, id);
            }
            _ids.length = 0;
            options.onDisable?.();
        },
        toggle(enabled) {
            enabled ??= !this.enabled;
            if (enabled) {
                this.activate();
            }
            else {
                this.disable();
            }
        },
    };
}
export function executeWhenReady(fn) {
    if (game.ready) {
        fn();
    }
    else {
        Hooks.once("ready", fn);
    }
}
