import { getSetting, localize, R } from ".";
class CustomModule {
    #api = {};
    #current;
    #debug = {};
    #globalName = "";
    #id;
    get id() {
        if (!this.#id) {
            throw new Error("Module needs to be registered.");
        }
        return this.#id;
    }
    get current() {
        return (this.#current ??= game.modules.get(this.id));
    }
    get name() {
        return this.current.title;
    }
    get isDebug() {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    }
    register(id, globalName) {
        if (this.#id) {
            throw new Error("Module was already registered.");
        }
        this.#id = id;
        this.#globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());
        Hooks.once("init", () => {
            const self = this;
            const context = {};
            Object.defineProperties(context, {
                active: {
                    get() {
                        return self.current.active;
                    },
                    configurable: false,
                    enumerable: false,
                },
                api: {
                    get() {
                        return self.#api;
                    },
                    configurable: false,
                    enumerable: false,
                },
                debug: {
                    get() {
                        return self.#debug;
                    },
                    configurable: false,
                    enumerable: false,
                },
                getSetting: {
                    value: function (setting) {
                        return self.current.active ? getSetting(setting) : undefined;
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false,
                },
                localize: {
                    value: localize.sub(id),
                    configurable: false,
                    enumerable: false,
                    writable: false,
                },
            });
            Object.defineProperty(game, this.#globalName, {
                value: context,
                configurable: false,
                enumerable: false,
                writable: false,
            });
        });
    }
    globalPath(...path) {
        const joined = R.join(path, ".");
        return joined ? `${this.#globalName}.${joined}` : `${this.#globalName}`;
    }
    path(...path) {
        const joined = R.join(path, ".");
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    }
    relativePath(...path) {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    }
    imagePath(...path) {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    }
    templatePath(...path) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    }
    Error(str) {
        return new Error(`\n[${this.name}] ${str}`);
    }
    error(str, error) {
        let message = `[${this.name}] ${str}`;
        if (error instanceof Error) {
            message += `\n${error.message}`;
        }
        else if (typeof error === "string") {
            message += `\n${error}`;
        }
        console.error(message);
    }
    apiExpose(key, toExpose) {
        if (foundry.utils.hasProperty(this.#api, key)) {
            throw this.Error(`the api key was already defined: ${key}`);
        }
        const exposed = foundry.utils.deepClone(toExpose);
        Object.freeze(exposed);
        Object.defineProperty(this.#api, key, {
            value: exposed,
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }
    debugExpose(key, toExpose) {
        if (foundry.utils.hasProperty(this.#debug, key)) {
            throw this.Error(`the debug key was already defined: ${key}`);
        }
        const exposed = foundry.utils.deepClone(toExpose);
        Object.freeze(exposed);
        Object.defineProperty(this.#debug, key, {
            value: exposed,
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }
}
function getActiveModule(key) {
    const module = game.modules.get(key);
    if (!module?.active)
        return;
    return {
        ...module,
        getSetting(...path) {
            return game.settings.get(module.id, R.join(path, "."));
        },
    };
}
const MODULE = new CustomModule();
export { getActiveModule, MODULE };
