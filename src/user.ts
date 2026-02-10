import { ActorPF2e, UserPF2e } from "foundry-pf2e";

export function getCurrentUser(): UserPF2e {
    return game.user ?? game.data.users.find((x) => x._id === game.userId);
}

export function userIsGM(user: UserPF2e = getCurrentUser()): boolean {
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}

export function isPrimaryUpdater(actor: ActorPF2e): boolean {
    return actor.primaryUpdater === game.user;
}
