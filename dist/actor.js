export function belongToPartyAlliance(actor) {
    return actor.system.details.alliance === "party";
}
export function oppositeAlliance(alliance) {
    return alliance === "party" ? "opposition" : alliance === "opposition" ? "party" : null;
}
