import { DocumentUUID } from "foundry-pf2e/foundry/client/utils/_module.mjs";
import { R } from ".";

export class SYSTEM {
    static get id(): SystemId {
        return game.system.id as SystemId;
    }

    static get isPF2e(): boolean {
        return this.id === "pf2e";
    }

    static get isSF2e(): boolean {
        return this.id === "sf2e";
    }

    static path(...path: string[]): () => string {
        return () => this.relativePath(...path);
    }

    static uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S {
        return (): P | S => {
            return this.isSF2e ? sf2e : pf2e;
        };
    }

    static relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    static relativePath(...path: string[]): string;
    static relativePath(...path: string[]) {
        const tail = R.join(path, "/");
        return `systems/${this.id}/${tail}`;
    }

    static sluggify(text: string, options?: { camel?: "dromedary" | "bactrian" }): string {
        return game.pf2e.system.sluggify(text, options);
    }
}
