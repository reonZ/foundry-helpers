import { ActorAlliance, ActorPF2e, CharacterPF2e, LootPF2e, ValueAndMax } from "pf2e-types";

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

function getMythicOrHeroPoints(actor: CharacterPF2e): MythicOrHeroPoints {
    const slug = actor.system.resources.mythicPoints.max ? "mythic-points" : "hero-points";
    const resource = actor.getResource(slug);

    return {
        slug,
        name: slug === "hero-points" ? "heroPoints" : "mythicPoints",
        max: resource.max,
        value: resource.value,
    };
}

type ActorTargetAlliance = "all" | "allies" | "enemies";

type MythicOrHeroPoints = ValueAndMax & {
    name: "mythicPoints" | "heroPoints";
    slug: "mythic-points" | "hero-points";
};

export {
    actorsRespectAlliance,
    belongToPartyAlliance,
    getMythicOrHeroPoints,
    isAllyActor,
    isMerchant,
    oppositeAlliance,
};
export type { ActorTargetAlliance, MythicOrHeroPoints };
