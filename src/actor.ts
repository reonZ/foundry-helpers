import {
    ActorAlliance,
    ActorPF2e,
    ActorSizePF2e,
    CharacterPF2e,
    CreaturePF2e,
    FamiliarPF2e,
    LootPF2e,
    ValueAndMax,
} from "@7h3laughingman/pf2e-types";

const PARTY_ACTOR_ID = "xxxPF2ExPARTYxxx";

function getDispositionColor(actor?: ActorPF2e | null) {
    const alliance = actor?.alliance;
    const colorValue = !actor
        ? CONFIG.Canvas.dispositionColors.NEUTRAL
        : alliance === "party"
          ? actor.hasPlayerOwner
              ? CONFIG.Canvas.dispositionColors.PARTY
              : CONFIG.Canvas.dispositionColors.FRIENDLY
          : alliance === "opposition"
            ? CONFIG.Canvas.dispositionColors.HOSTILE
            : CONFIG.Canvas.dispositionColors.NEUTRAL;

    return new Color(colorValue);
}

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

function getActorMaster(actor: Maybe<ActorPF2e>): ActorPF2e | null {
    if (!actor) return null;

    return (
        (actor as FamiliarPF2e).master ?? game.toolbelt?.api.shareData.getMasterInMemory(actor as CreaturePF2e) ?? null
    );
}

function getActorSize(actor: CreaturePF2e): ActorSizePF2e {
    const ActorSizeCls = actor.system.traits.size.constructor as typeof ActorSizePF2e;
    return new ActorSizeCls({
        value: actor.system.traits.naturalSize ?? actor.size,
        smallIsMedium: true,
    });
}

type ActorTargetAlliance = "all" | "allies" | "enemies";

type MythicOrHeroPoints = ValueAndMax & {
    name: "mythicPoints" | "heroPoints";
    slug: "mythic-points" | "hero-points";
};

export {
    actorsRespectAlliance,
    belongToPartyAlliance,
    getActorMaster,
    getActorSize,
    getDispositionColor,
    getMythicOrHeroPoints,
    isAllyActor,
    isMerchant,
    oppositeAlliance,
    PARTY_ACTOR_ID,
};
export type { ActorTargetAlliance, MythicOrHeroPoints };
