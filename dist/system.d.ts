import { GamePF2e } from "@7h3laughingman/pf2e-types";
import { CompendiumCollection, DocumentUUID } from ".";
declare class SYSTEM {
    static get id(): SystemId;
    static get isPF2e(): boolean;
    static get isSF2e(): boolean;
    static relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    static relativePath(...path: string[]): string;
    static path<T extends string>(tail: T): () => `systems/${string}/${T}`;
    static path(...path: string[]): () => string;
    static uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S;
    static sluggify(text: string, options?: {
        camel?: SlugCamel;
    }): string;
    static getPack<T extends PackContent>(name: string): CompendiumCollection<T> | undefined;
}
type SlugCamel = "dromedary" | "bactrian" | null;
type PackCollection = GamePF2e["packs"] extends Collection<string, infer T> ? T : never;
type PackContent = PackCollection extends CompendiumCollection<infer T> ? T : never;
export { SYSTEM };
export type { SlugCamel };
