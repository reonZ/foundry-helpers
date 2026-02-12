import { ActorAlliance, ActorPF2e } from "foundry-pf2e";
import { ActorSheetOptions as _ActorSheetOptions } from "foundry-pf2e/foundry/client/appv1/sheets/actor-sheet.mjs";
import { ActorUUID as _ActorUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";

export function belongToPartyAlliance(actor: ActorPF2e): boolean {
    return actor.system.details.alliance === "party";
}

export function oppositeAlliance(alliance: ActorAlliance) {
    return alliance === "party" ? "opposition" : alliance === "opposition" ? "party" : null;
}

export function isAllyActor(actor: ActorPF2e) {
    return actor.alliance === "party" || actor.testUserPermission(game.user, "OBSERVER");
}

export type ActorSheetOptions = _ActorSheetOptions;
export type ActorUUID = _ActorUUID;
