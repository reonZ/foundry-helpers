import { ActorAlliance, ActorPF2e, LootPF2e } from "foundry-pf2e";
import { ActorSheetOptions } from "foundry-pf2e/foundry/client/appv1/sheets/actor-sheet.mjs";
import { ActorUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";

function actorsRespectAlliance(origin: ActorPF2e, target: ActorPF2e, alliance: ActorTargetAlliance = "all") {
    return alliance === "allies" ? target.isAllyOf(origin) : alliance === "enemies" ? target.isEnemyOf(origin) : true;
}

function belongToPartyAlliance(actor: ActorPF2e): boolean {
    return actor.system.details.alliance === "party";
}

function oppositeAlliance(alliance: ActorAlliance) {
    return alliance === "party" ? "opposition" : alliance === "opposition" ? "party" : null;
}

function isAllyActor(actor: ActorPF2e) {
    return actor.alliance === "party" || actor.testUserPermission(game.user, "OBSERVER");
}

function isMerchant(actor: Maybe<ActorPF2e>): actor is LootPF2e {
    return !!actor?.isOfType("loot") && actor.isMerchant;
}

type ActorTargetAlliance = "all" | "allies" | "enemies";

export { actorsRespectAlliance, belongToPartyAlliance, isAllyActor, isMerchant, oppositeAlliance };
export type { ActorSheetOptions, ActorTargetAlliance, ActorUUID };
