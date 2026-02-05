import { localize, R } from ".";
export class MODULE {
    static #instance;
    static #current;
    #id;
    #globalName;
    constructor(id, globalName) {
        this.#id = id;
        this.#globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());
        this.#initialize();
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
    static error(...args) {
        if (args.at(-1) instanceof Error) {
            const error = args.pop();
            args.push(error.message);
        }
        console.error(...args);
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
    #initialize() {
        Hooks.once("init", () => {
            // @ts-expect-error
            game[this.#globalName] = this;
        });
    }
}
