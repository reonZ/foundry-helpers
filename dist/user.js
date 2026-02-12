export function getCurrentUser() {
    return game.user ?? game.data.users.find((x) => x._id === game.userId);
}
export function userIsGM(user = getCurrentUser()) {
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}
export function isPrimaryUpdater(actor) {
    return actor.primaryUpdater === game.user;
}
export function primaryPlayerOwner(actor) {
    // even though we want a player, assigned users take priority
    const assigned = game.users.getDesignatedUser((user) => user.active && user.character === actor);
    return (assigned ??
        game.users.getDesignatedUser((user) => user.active && !user.isGM && actor.testUserPermission(user, "OWNER")));
}
export function isPrimaryOwner(actor, user = game.user) {
    return user.isGM || primaryPlayerOwner(actor) === user;
}
