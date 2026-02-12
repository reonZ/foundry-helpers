import { getSetting, localize, R } from ".";
const _MODULE = {
    id: "",
    localize: undefined,
    groupLog: false,
    globalName: "",
    current: undefined,
    expose: {
        api: {},
        debug: {},
        dev: {},
    },
};
const MODULE = {
    get id() {
        if (!_MODULE.id) {
            throw new Error("Module needs to be registered.");
        }
        return _MODULE.id;
    },
    get name() {
        if (!_MODULE.id) {
            throw new Error("Module needs to be registered.");
        }
        return this.current.title;
    },
    get current() {
        return (_MODULE.current ??= game.modules.get(this.id));
    },
    get isDebug() {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    },
    path(...path) {
        const joined = R.join(path, ".");
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    },
    relativePath(...path) {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    },
    imagePath(...path) {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    },
    templatePath(...path) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    },
    Error(str) {
        return new Error(`\n[${this.name}] ${str}`);
    },
    error(str, error) {
        let message = `[${this.name}] ${str}`;
        if (error instanceof Error) {
            message += `\n${error.message}`;
        }
        else if (typeof error === "string") {
            message += `\n${error}`;
        }
        console.error(message);
    },
    apiExpose(path, toExpose) {
        if (foundry.utils.hasProperty(_MODULE.expose.api, path)) {
            throw this.Error(`the api path was already defined: ${path}`);
        }
        const exposed = {};
        for (const [key, fn] of R.entries(toExpose)) {
            Object.defineProperty(exposed, key, {
                value: fn,
                configurable: false,
                enumerable: false,
                writable: false,
            });
        }
        foundry.utils.setProperty(_MODULE.expose.api, path, exposed);
    },
    debugExpose(path, toExpose) {
        if (foundry.utils.hasProperty(_MODULE.expose.debug, path)) {
            throw this.Error(`the debug path was already defined: ${path}`);
        }
        foundry.utils.setProperty(_MODULE.expose.debug, path, toExpose);
    },
    register(id, globalName) {
        if (_MODULE.id) {
            throw new Error("Module was already registered.");
        }
        _MODULE.id = id;
        _MODULE.globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());
        Hooks.once("init", () => {
            // @ts-expect-error
            const context = (game[_MODULE.globalName] ??= {});
            Object.defineProperties(context, {
                active: {
                    get() {
                        return MODULE.current.active;
                    },
                    configurable: false,
                    enumerable: false,
                },
                api: {
                    get() {
                        return _MODULE.expose.api;
                    },
                    configurable: false,
                    enumerable: false,
                },
                debug: {
                    get() {
                        return MODULE.isDebug ? _MODULE.expose.debug : {};
                    },
                    configurable: false,
                    enumerable: false,
                },
                getSetting: {
                    value: function (setting) {
                        return MODULE.current.active ? getSetting(setting) : undefined;
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false,
                },
                localize: {
                    get() {
                        return (_MODULE.localize ??= localize.sub(_MODULE.id));
                    },
                    configurable: false,
                    enumerable: false,
                },
            });
        });
    },
};
export { MODULE };
