import { ActorPF2e, UserPF2e } from "foundry-pf2e";
export declare function getCurrentUser(): UserPF2e;
export declare function userIsGM(user?: UserPF2e): boolean;
export declare function isPrimaryUpdater(actor: ActorPF2e): boolean;
export declare function primaryPlayerOwner(actor: ActorPF2e): UserPF2e | null;
export declare function isPrimaryOwner(actor: ActorPF2e, user?: UserPF2e & {
    active: true;
}): boolean;
