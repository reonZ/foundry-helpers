export function belongToPartyAlliance(actor) {
    return actor.system.details.alliance === "party";
}
export function oppositeAlliance(alliance) {
    return alliance === "party" ? "opposition" : alliance === "opposition" ? "party" : null;
}
export function isAllyActor(actor) {
    return actor.alliance === "party" || actor.testUserPermission(game.user, "OBSERVER");
}
export function isMerchant(actor) {
    return !!actor?.isOfType("loot") && actor.isMerchant;
}
