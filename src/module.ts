import { getSetting, ImageFilePath, localize, Module, R } from ".";

class CustomModule {
    #api: Record<string, any> = {};
    #current?: Module;
    #debug: Record<string, any> = {};
    #globalName: string = "";
    #group: string | boolean = false;
    #id?: string;

    get id(): string {
        if (!this.#id) {
            throw new Error("Module needs to be registered.");
        }
        return this.#id;
    }

    get current(): Module {
        return (this.#current ??= game.modules.get(this.id) as Module);
    }

    get name(): string {
        return this.current.title;
    }

    get isDebug(): boolean {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    }

    register(id: string, globalName?: string) {
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
                    get(): boolean {
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
                        return self.isDebug ? self.#debug : undefined;
                    },
                    configurable: false,
                    enumerable: false,
                },
                getSetting: {
                    value: function (setting: string): unknown {
                        return getSetting(setting);
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

    group(label: string) {
        this.groupEnd();
        this.#group = label;
    }

    groupEnd() {
        console.groupEnd();
        this.#group = false;
    }

    log(...args: any[]) {
        if (R.isString(this.#group)) {
            console.group(`[${this.name}] ${this.#group}`);
            this.#group = true;
        }

        if (this.#group) {
            console.log(...args);
        } else {
            console.log(`[${this.name}]`, ...args);
        }
    }

    debug(...args: any[]) {
        if (this.isDebug) {
            this.log(...args);
        }
    }

    globalPath(...path: string[]): string {
        const joined = R.join(path, ".");
        return joined ? `${this.#globalName}.${joined}` : `${this.#globalName}`;
    }

    path(...path: string[]): string {
        const joined = R.join(path, ".");
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    }

    relativePath(...path: string[]): string {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    }

    imagePath(...path: string[]): ImageFilePath {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    }

    templatePath(...path: string[]): `${string}.hbs` {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    }

    Error(str: string): Error {
        return new Error(`\n[${this.name}] ${str}`);
    }

    error(str: string, error?: Error) {
        let message = `[${this.name}] ${str}`;

        if (error instanceof Error) {
            message += `\n${error.message}`;
        } else if (typeof error === "string") {
            message += `\n${error}`;
        }

        console.error(message);
    }

    apiExpose(key: string, toExpose: Record<string, any> | Function) {
        if (foundry.utils.hasProperty(this.#api, key)) {
            throw this.Error(`the api key was already defined: ${key}`);
        }

        const exposed = R.isObjectType(toExpose) ? foundry.utils.deepClone(toExpose) : toExpose;

        Object.freeze(exposed);
        Object.defineProperty(this.#api, key, {
            value: exposed,
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }

    debugExpose(key: string, toExpose: any) {
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

function getActiveModule(key: string): ActiveModule | undefined {
    const module = game.modules.get(key);
    if (!module?.active) return;

    return {
        ...module,
        getSetting<T>(...path: string[]) {
            return game.settings.get(module.id, R.join(path, ".")) as T;
        },
    } as ActiveModule;
}

const MODULE = new CustomModule();

type ExtendedModule<TModule extends Module = Module> = TModule & {
    getSetting<T = boolean>(key: string): T;
    setSetting<T>(key: string, value: T): Promise<T>;
};

type ActiveModule = Module & {
    getSetting<T = boolean>(...path: string[]): T;
};

export { getActiveModule, MODULE };
export type { ExtendedModule };
