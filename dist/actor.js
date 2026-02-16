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
export { actorsRespectAlliance, belongToPartyAlliance, getActorMaster, getMythicOrHeroPoints, isAllyActor, isMerchant, oppositeAlliance, };
