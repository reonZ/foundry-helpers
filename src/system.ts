import { DocumentUUID } from "foundry-pf2e/foundry/client/utils/_module.mjs";
import { SlugCamel } from "foundry-pf2e/pf2e/util/misc.js";
import { R } from ".";

const SYSTEM: SYSTEM = {
    get id(): SystemId {
        return game.system.id as SystemId;
    },
    get isPF2e(): boolean {
        return this.id === "pf2e";
    },
    get isSF2e(): boolean {
        return this.id === "sf2e";
    },
    relativePath(...path: string[]): any {
        const tail = R.join(path, "/");
        return `systems/${this.id}/${tail}`;
    },
    path(...path: string[]): any {
        return () => this.relativePath(...path);
    },
    uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S {
        return (): P | S => {
            return this.isSF2e ? sf2e : pf2e;
        };
    },
    sluggify(text: string, options?: { camel?: SlugCamel }): string {
        return game.pf2e.system.sluggify(text, options);
    },
};

interface SYSTEM {
    get id(): "pf2e" | "sf2e";
    get isPF2e(): boolean;
    get isSF2e(): boolean;
    relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    relativePath(...path: string[]): string;
    path<T extends string>(tail: T): () => `systems/${string}/${T}`;
    path(...path: string[]): () => string;
    uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S;
    sluggify(text: string, options?: { camel?: SlugCamel }): string;
}

export { SYSTEM };
