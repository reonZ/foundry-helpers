import { GamePF2e } from "@7h3laughingman/pf2e-types";
import { ClientDocument, CompendiumCollection, DocumentUUID, R } from ".";
import { CompendiumUUID } from "@7h3laughingman/foundry-types/client/utils/_module.mjs";
import {
    ActorUUID,
    CompendiumDocument,
    ItemUUID,
    TokenDocumentUUID,
} from "@7h3laughingman/foundry-types/client/documents/_module.mjs";

class SYSTEM {
    static get id(): SystemId {
        return game.system.id as SystemId;
    }

    static get oppositeId(): SystemId {
        return this.id === "pf2e" ? "sf2e" : "pf2e";
    }

    static get anachronismId(): `${SystemId}-anachronism` {
        return `${this.oppositeId}-anachronism`;
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

    static uuid<P extends DocumentUUID>(pf2e: P, sf2e: P): () => P {
        return (): P => {
            return this.isSF2e ? sf2e : pf2e;
        };
    }

    static itemUuid(pf2e: ItemUUID, sf2e: ItemUUID): () => ItemUUID {
        return (): ItemUUID => {
            return this.isSF2e ? sf2e : pf2e;
        };
    }

    static uuids<P extends DocumentUUID>(entries: [pf2e: P, sf2e: P][]): () => P[] {
        return (): P[] => {
            const index = this.isSF2e ? 1 : 0;
            return entries.map((entry) => entry[index]);
        };
    }

    static fromUuid(uuid: () => CompendiumUUID): Promise<CompendiumDocument | null>;
    static fromUuid(uuid: () => ActorUUID): Promise<Actor | null>;
    static fromUuid(uuid: () => ItemUUID): Promise<Item | null>;
    static fromUuid(uuid: () => TokenDocumentUUID): Promise<TokenDocument | null>;
    static fromUuid<TDocument extends ClientDocument>(uuid: () => DocumentUUID): Promise<TDocument | null>;
    static fromUuid(uuid: () => DocumentUUID): Promise<any | null> {
        const singleUuid = uuid();
        return fromUuid(singleUuid);
    }

    static pack<T extends PackContent>(pf2e: string, sf2e: string): () => CompendiumCollection<T> | undefined {
        return () => {
            return this.getPack(pf2e, sf2e);
        };
    }

    static sluggify(text: string, options?: { camel?: SlugCamel }): string {
        return game.pf2e.system.sluggify(text, options);
    }

    static getPack<T extends PackContent>(pf2e: string, sf2e: string): CompendiumCollection<T> | undefined {
        const name = this.isSF2e ? sf2e : pf2e;
        return game.packs.get(name);
    }

    static getSystemPack<T extends PackContent>(name: string): CompendiumCollection<T> | undefined {
        return game.packs.get(`${this.id}.${name}`);
    }

    static getAnachronismPack<T extends PackContent>(name: string): CompendiumCollection<T> | undefined {
        return game.packs.get(`${this.anachronismId}.${name}`);
    }
}

type SlugCamel = "dromedary" | "bactrian" | null;

type PackCollection = GamePF2e["packs"] extends Collection<string, infer T> ? T : never;
type PackContent = PackCollection extends CompendiumCollection<infer T> ? T : never;

export { SYSTEM };
export type { SlugCamel };
