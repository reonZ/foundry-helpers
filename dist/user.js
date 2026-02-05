export function getCurrentUser() {
    return game.user ?? game.data.users.find((x) => x._id === game.userId);
}
export function userIsGM(user = getCurrentUser()) {
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}
