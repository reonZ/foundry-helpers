import { ActorPF2e, UserPF2e } from "pf2e-types";
declare function getCurrentUser(): UserPF2e;
declare function userIsGM(user?: UserPF2e): boolean;
declare function isPrimaryUpdater(actor: ActorPF2e): boolean;
declare function primaryPlayerOwner(actor: ActorPF2e): UserPF2e | null;
declare function isPrimaryOwner(actor: ActorPF2e, user?: UserPF2e & {
    active: true;
}): boolean;
export { getCurrentUser, userIsGM, isPrimaryUpdater, primaryPlayerOwner, isPrimaryOwner };
