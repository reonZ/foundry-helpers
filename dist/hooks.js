export function registerUpstreamHook(event, listener, once) {
    const id = Hooks[once ? "once" : "on"](event, listener);
    const hook = Hooks.events[event].findSplice((x) => x.id === id);
    if (hook) {
        Hooks.events[event].unshift(hook);
    }
    return id;
}
export class ToggleableHook {
    #hooks;
    #ids = [];
    #listener;
    #options;
    constructor(hook, listener, options = {}) {
        this.#hooks = Array.isArray(hook) ? hook : [hook];
        this.#listener = listener;
        this.#options = options;
    }
    get enabled() {
        return this.#ids.length > 0;
    }
    activate() {
        if (this.enabled)
            return;
        for (const path of this.#hooks) {
            const id = this.#options.upstream
                ? registerUpstreamHook(path, this.#listener)
                : Hooks.on(path, this.#listener);
            this.#ids.push({ id, path });
        }
        this.#options.onActivate?.();
    }
    disable() {
        if (!this.enabled)
            return;
        for (const { path, id } of this.#ids) {
            Hooks.off(path, id);
        }
        this.#ids.length = 0;
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
export function executeWhenReady(fn) {
    if (game.ready) {
        fn();
    }
    else {
        Hooks.once("ready", fn);
    }
}
