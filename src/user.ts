import { UserPF2e } from "foundry-pf2e";

export function getCurrentUser(): UserPF2e {
    return game.user ?? game.data.users.find((x) => x._id === game.userId);
}

export function userIsGM(user: UserPF2e = getCurrentUser()): boolean {
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}
