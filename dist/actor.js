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
export { actorsRespectAlliance, belongToPartyAlliance, isAllyActor, isMerchant, oppositeAlliance };
