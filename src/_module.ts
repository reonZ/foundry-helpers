import { Module } from "foundry-pf2e/foundry/client/packages/_module.mjs";
import { localize, LocalizeArgs, R } from ".";

export class MODULE<TApi extends Record<string, any> = Record<string, any>> {
    static #instance: MODULE;
    static #current: Module;

    #api = {} as TApi;
    #debug = {};
    #id: string;
    #globalName: string;

    constructor(id: string, globalName?: string) {
        this.#id = id;
        this.#globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());

        Hooks.once("init", () => {
            const self = this;
            Object.defineProperty(game, this.#globalName, {
                value: self,
                configurable: false,
                enumerable: false,
                writable: false,
            });
        });
    }

    static register(id: string, globalName?: string) {
        if (this.#instance) {
            throw new Error("Module was already registered.");
        }

        this.#instance = new MODULE(id, globalName);
    }

    static get id(): string {
        return this.#instance.#id;
    }

    static get current(): Module {
        return (this.#current ??= game.modules.get(this.id) as Module);
    }

    static get name(): string {
        return this.current.title;
    }

    static get isDebug(): boolean {
        // @ts-expect-error
        return !!CONFIG.debug[this.id];
    }

    static path(...path: string[]): string {
        const tail = R.join(path, ".");
        return `${this.id}.${tail}`;
    }

    static relativePath(...path: string[]): string {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    }

    static imagePath(...path: string[]) {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    }

    static templatePath(...path: string[]) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    }

    static Error(error: any) {
        const msg = error instanceof Error ? error.message : error;
        return new Error(`\n[${this.name}] ${msg}`);
    }

    static error(...args: [...string[], string | Error]) {
        if (args.at(-1) instanceof Error) {
            const error = args.pop() as Error;
            args.push(error.message);
        }

        console.error(`[${this.name}]`, ...args);
    }

    static apiExpose(path: string, object: Record<string, Function>, context?: any) {
        if (foundry.utils.hasProperty(this.#instance.api, path)) {
            throw this.Error(`the api path was already defined: ${path}`);
        }

        const exposed: Record<string, Function> = {};

        for (const [key, fn] of R.entries(object)) {
            Object.defineProperty(exposed, key, {
                value: context ? fn.bind(context) : fn,
                configurable: false,
                enumerable: false,
                writable: false,
            });
        }

        foundry.utils.setProperty(this.#instance.api, path, exposed);
    }

    static debugExpose(path: string, toExpose: any) {
        this.#instance.debugExpose(path, toExpose);
    }

    get api(): TApi {
        return this.#api;
    }

    get id(): string {
        return this.#id;
    }

    get active(): boolean {
        return MODULE.current.active;
    }

    // that way, it is only accessible from the browser console for debugging purpose
    debugExpose(path: string, toExpose: any) {
        if (foundry.utils.hasProperty(this.#debug, path)) {
            throw (this.constructor as typeof MODULE).Error(`the debug path was already defined: ${path}`);
        }

        foundry.utils.setProperty(this.#debug, path, toExpose);
    }

    getSetting(...path: string[]) {
        return this.active ? game.settings.get(this.id, R.join(path, ".")) : undefined;
    }

    localize(...args: LocalizeArgs): string {
        return localize(...args);
    }
}
