import { Module } from "foundry-pf2e/foundry/client/packages/_module.mjs";
import { localize, LocalizeArgs, R } from ".";

export class MODULE {
    static #instance: MODULE;
    static #current: Module;

    #id: string;
    #globalName: string;

    constructor(id: string, globalName?: string) {
        this.#id = id;
        this.#globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());

        this.#initialize();
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

    static get current() {
        return (this.#current ??= game.modules.get(this.id) as Module);
    }

    static path(...path: string[]): string {
        const tail = R.join(path, ".");
        return `${this.id}.${tail}`;
    }

    static relativePath(...path: string[]): string {
        const tail = R.join(path, "/");
        return `modules/${this.id}/${tail}`;
    }

    static templatePath(...path: string[]) {
        const root = this.relativePath("templates", ...path);
        return `${root}.hbs`;
    }

    static error(...args: [...string[], string | Error]) {
        if (args.at(-1) instanceof Error) {
            const error = args.pop() as Error;
            args.push(error.message);
        }

        console.error(...args);
    }

    get id(): string {
        return this.#id;
    }

    get active(): boolean {
        return MODULE.current.active;
    }

    getSetting(...path: string[]) {
        return this.active ? game.settings.get(this.id, R.join(path, ".")) : undefined;
    }

    localize(...args: LocalizeArgs): string {
        return localize(...args);
    }

    #initialize() {
        Hooks.once("init", () => {
            // @ts-expect-error
            game[this.#globalName] = this;
        });
    }
}
