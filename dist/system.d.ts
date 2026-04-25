import { GamePF2e } from "@7h3laughingman/pf2e-types";
import { ClientDocument, CompendiumCollection, DocumentUUID } from ".";
import { CompendiumUUID } from "@7h3laughingman/foundry-types/client/utils/_module.mjs";
import { ActorUUID, CompendiumDocument, ItemUUID, TokenDocumentUUID } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
declare class SYSTEM {
    static get id(): SystemId;
    static get isPF2e(): boolean;
    static get isSF2e(): boolean;
    static relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    static relativePath(...path: string[]): string;
    static path<T extends string>(tail: T): () => `systems/${string}/${T}`;
    static path(...path: string[]): () => string;
    static uuid<P extends DocumentUUID>(pf2e: P, sf2e?: P): () => P;
    static itemUuid(pf2e: ItemUUID, sf2e?: ItemUUID): () => ItemUUID;
    static uuids<P extends DocumentUUID>(entries: [pf2e: P, sf2e: P][]): () => P[];
    static fromUuid(uuid: () => CompendiumUUID): Promise<CompendiumDocument | null>;
    static fromUuid(uuid: () => ActorUUID): Promise<Actor | null>;
    static fromUuid(uuid: () => ItemUUID): Promise<Item | null>;
    static fromUuid(uuid: () => TokenDocumentUUID): Promise<TokenDocument | null>;
    static fromUuid<TDocument extends ClientDocument>(uuid: () => DocumentUUID): Promise<TDocument | null>;
    static pack<T extends PackContent>(pf2e: string, sf2e?: string): () => CompendiumCollection<T> | undefined;
    static sluggify(text: string, options?: {
        camel?: SlugCamel;
    }): string;
    static getPack<T extends PackContent>(pf2e: string, sf2e?: string): CompendiumCollection<T> | undefined;
}
type SlugCamel = "dromedary" | "bactrian" | null;
type PackCollection = GamePF2e["packs"] extends Collection<string, infer T> ? T : never;
type PackContent = PackCollection extends CompendiumCollection<infer T> ? T : never;
export { SYSTEM };
export type { SlugCamel };
