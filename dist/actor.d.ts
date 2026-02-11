import { ActorAlliance, ActorPF2e } from "foundry-pf2e";
import { ActorSheetOptions as _ActorSheetOptions } from "foundry-pf2e/foundry/client/appv1/sheets/actor-sheet.mjs";
export declare function belongToPartyAlliance(actor: ActorPF2e): boolean;
export declare function oppositeAlliance(alliance: ActorAlliance): "party" | "opposition" | null;
export declare function isAllyActor(actor: ActorPF2e): boolean;
export type ActorSheetOptions = _ActorSheetOptions;
