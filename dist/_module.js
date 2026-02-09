import { localize, R } from ".";
export class MODULE {
    static #instance;
    static #current;
    #api = {};
    #id;
    #globalName;
    constructor(id, globalName) {
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
    static register(id, globalName) {
        if (this.#instance) {
            throw new Error("Module was already registered.");
        }
        this.#instance = new MODULE(id, globalName);
    }
    static get id() {
        return this.#instance.#id;
    }
    static get current() {
        return (this.#current ??= game.modules.get(this.id));
    }
    static get name() {
        return this.current.title;
    }
    static path(...path) {
        const tail = R.join(path, ".");
        return `${this.id}.${tail}`;
    }
    static relativePath(...path) {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    }
    static imagePath(...path) {
        const root = this.relativePath("images", ...path);
        return `${root}.webp`;
    }
    static templatePath(...path) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    }
    static Error(error) {
        return new Error(`\n[${this.name}] ${error}`);
    }
    static error(...args) {
        if (args.at(-1) instanceof Error) {
            const error = args.pop();
            args.push(error.message);
        }
        console.error(`[${this.name}]`, ...args);
    }
    static apiExpose(path, object, context) {
        if (foundry.utils.hasProperty(this.#instance.api, path)) {
            throw this.Error(`the api path was already defined: ${path}`);
        }
        const api = {};
        for (const [key, fn] of R.entries(object)) {
            Object.defineProperty(api, key, {
                value: context ? fn.bind(context) : fn,
                configurable: false,
                enumerable: false,
                writable: false,
            });
        }
    }
    get api() {
        return this.#api;
    }
    get id() {
        return this.#id;
    }
    get active() {
        return MODULE.current.active;
    }
    getSetting(...path) {
        return this.active ? game.settings.get(this.id, R.join(path, ".")) : undefined;
    }
    localize(...args) {
        return localize(...args);
    }
}
