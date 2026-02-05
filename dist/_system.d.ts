import { DocumentUUID } from "foundry-pf2e/foundry/client/utils/_module.mjs";
export declare class SYSTEM {
    static get id(): SystemId;
    static get isPF2e(): boolean;
    static get isSF2e(): boolean;
    static path(...path: string[]): () => string;
    static uuid<P extends DocumentUUID, S extends DocumentUUID = P>(pf2e: P, sf2e: S): () => P | S;
    static relativePath(...path: string[]): string;
    static sluggify(text: string, options?: {
        camel?: "dromedary" | "bactrian";
    }): string;
}
