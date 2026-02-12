import { ActorAlliance, ActorPF2e, LootPF2e } from "foundry-pf2e";
import { ActorSheetOptions as _ActorSheetOptions } from "foundry-pf2e/foundry/client/appv1/sheets/actor-sheet.mjs";
import { ActorUUID as _ActorUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";
export declare function belongToPartyAlliance(actor: ActorPF2e): boolean;
export declare function oppositeAlliance(alliance: ActorAlliance): "party" | "opposition" | null;
export declare function isAllyActor(actor: ActorPF2e): boolean;
export declare function isMerchant(actor: Maybe<ActorPF2e>): actor is LootPF2e;
export type ActorSheetOptions = _ActorSheetOptions;
export type ActorUUID = _ActorUUID;
