function getActorMaxRank(actor) {
    return Math.max(1, Math.ceil(actor.level / 2));
}
export { getActorMaxRank };
