import { GamePF2e } from "@7h3laughingman/pf2e-types";
import { CompendiumCollection, DocumentUUID, R } from ".";

class SYSTEM {
    static get id(): SystemId {
        return game.system.id as SystemId;
    }

    static get isPF2e(): boolean {
        return this.id === "pf2e";
    }

    static get isSF2e(): boolean {
        return this.id === "sf2e";
    }

    static relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    static relativePath(...path: string[]): string;
    static relativePath(...path: string[]) {
        const tail = R.join(path, "/");
        return `systems/${this.id}/${tail}`;
    }

    static path<T extends string>(tail: T): () => `systems/${string}/${T}`;
    static path(...path: string[]): () => string;
    static path(...path: string[]) {
        return () => this.relativePath(...path);
    }

    static uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S {
        return (): P | S => {
            return this.isSF2e ? sf2e : pf2e;
        };
    }

    static sluggify(text: string, options?: { camel?: SlugCamel }): string {
        return game.pf2e.system.sluggify(text, options);
    }

    static getPack<T extends PackContent>(name: string): CompendiumCollection<T> | undefined {
        return game.packs.get(`${SYSTEM.id}.${name}`);
    }
}

type SlugCamel = "dromedary" | "bactrian" | null;

type PackCollection = GamePF2e["packs"] extends Collection<string, infer T> ? T : never;
type PackContent = PackCollection extends CompendiumCollection<infer T> ? T : never;

export { SYSTEM };
export type { SlugCamel };
