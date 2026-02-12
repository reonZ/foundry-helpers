import { DocumentUUID } from "foundry-pf2e/foundry/client/utils/_module.mjs";
import { SlugCamel } from "foundry-pf2e/pf2e/util/misc.js";
declare const SYSTEM: SYSTEM;
interface SYSTEM {
    get id(): "pf2e" | "sf2e";
    get isPF2e(): boolean;
    get isSF2e(): boolean;
    relativePath<T extends string>(tail: T): `systems/${string}/${T}`;
    relativePath(...path: string[]): string;
    path<T extends string>(tail: T): () => `systems/${string}/${T}`;
    path(...path: string[]): () => string;
    uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S;
    sluggify(text: string, options?: {
        camel?: SlugCamel;
    }): string;
}
export { SYSTEM };
