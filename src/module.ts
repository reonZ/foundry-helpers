import { Module } from "foundry-pf2e/foundry/client/packages/_module.mjs";
import { getSetting, localize, LocalizeArgs, R } from ".";

const _MODULE = {
    id: "",
    groupLog: false,
    globalName: "",
    current: undefined as Module | undefined,
    expose: {
        api: {},
        debug: {},
        dev: {},
    } as ModuleExposed,
};

const MODULE = {
    get id(): string {
        if (!_MODULE.id) {
            throw new Error("Module needs to be registered.");
        }
        return _MODULE.id;
    },
    get name(): string {
        if (!_MODULE.id) {
            throw new Error("Module needs to be registered.");
        }
        return this.current.title;
    },
    get current(): Module {
        return (_MODULE.current ??= game.modules.get(this.id) as Module);
    },
    get isDebug(): boolean {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    },
    path(...path: string[]): string {
        const joined = R.join(path, ".");
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    },
    relativePath(...path: string[]): string {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    },
    imagePath(...path: string[]) {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    },
    templatePath(...path: string[]) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    },
    Error(str: string): Error {
        return new Error(`\n[${this.name}] ${str}`);
    },
    error(str: string, error?: Error) {
        let message = `[${this.name}] ${str}`;

        if (error instanceof Error) {
            message += `\n${error.message}`;
        } else if (typeof error === "string") {
            message += `\n${error}`;
        }

        console.error(message);
    },
    apiExpose(path: string, toExpose: Record<string, any>) {
        if (foundry.utils.hasProperty(_MODULE.expose.api, path)) {
            throw this.Error(`the api path was already defined: ${path}`);
        }

        const exposed: Record<string, Function> = {};

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
    debugExpose(path: string, toExpose: any) {
        if (foundry.utils.hasProperty(_MODULE.expose.debug, path)) {
            throw this.Error(`the debug path was already defined: ${path}`);
        }

        foundry.utils.setProperty(_MODULE.expose.debug, path, toExpose);
    },
    register(id: string, globalName?: string) {
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
                    get(): boolean {
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
                    value: function (setting: string): unknown {
                        return MODULE.current.active ? getSetting(setting) : undefined;
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false,
                },
                localize: {
                    value: function (...args: LocalizeArgs): string {
                        return localize(...args);
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false,
                },
            });
        });
    },
};

type ModuleExposed = Record<"api" | "debug" | "dev", Record<string, any>>;

type ExtendedModule<TModule extends Module = Module> = TModule & {
    getSetting<T = boolean>(key: string): T;
    setSetting<T>(key: string, value: T): Promise<T>;
};

export { MODULE };
export type { ExtendedModule };
