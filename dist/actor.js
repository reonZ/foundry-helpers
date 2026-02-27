const PARTY_ACTOR_ID = "xxxPF2ExPARTYxxx";
function getDispositionColor(actor) {
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
function actorsRespectAlliance(origin, target, alliance = "all") {
    return alliance === "allies" ? target.isAllyOf(origin) : alliance === "enemies" ? target.isEnemyOf(origin) : true;
}
function belongToPartyAlliance(actor) {
    return actor.system.details.alliance === "party";
}
function oppositeAlliance(alliance) {
    return alliance === "party" ? "opposition" : alliance === "opposition" ? "party" : null;
}
function isAllyActor(actor) {
    return actor.alliance === "party" || actor.testUserPermission(game.user, "OBSERVER");
}
function isMerchant(actor) {
    return !!actor?.isOfType("loot") && actor.isMerchant;
}
function getMythicOrHeroPoints(actor) {
    const slug = actor.system.resources.mythicPoints.max ? "mythic-points" : "hero-points";
    const resource = actor.getResource(slug);
    return {
        slug,
        name: slug === "hero-points" ? "heroPoints" : "mythicPoints",
        max: resource.max,
        value: resource.value,
    };
}
function getActorMaster(actor) {
    if (!actor)
        return null;
    return (actor.master ?? game.toolbelt?.api.shareData.getMasterInMemory(actor) ?? null);
}
function getActorSize(actor) {
    const ActorSizeCls = actor.system.traits.size.constructor;
    return new ActorSizeCls({
        value: actor.system.traits.naturalSize ?? actor.size,
        smallIsMedium: true,
    });
}
export { actorsRespectAlliance, belongToPartyAlliance, getActorMaster, getActorSize, getDispositionColor, getMythicOrHeroPoints, isAllyActor, isMerchant, oppositeAlliance, PARTY_ACTOR_ID, };
