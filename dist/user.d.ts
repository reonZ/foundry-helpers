import { ActorPF2e, UserPF2e } from "@7h3laughingman/pf2e-types";
declare function getCurrentUser(): UserPF2e;
declare function getSelectedActor(fn?: (actor: ActorPF2e) => boolean): ActorPF2e | null;
declare function userIsGM(user?: UserPF2e): boolean;
declare function isPrimaryUpdater(actor: ActorPF2e): boolean;
declare function primaryPlayerOwner<T extends Actor>(actor: T): (T extends ActorPF2e ? UserPF2e : User) | null;
declare function isPrimaryOwner(actor: Actor, user?: UserPF2e & {
    active: true;
}): boolean;
declare function canObserveActor(actor: Maybe<ActorPF2e>, withParty?: boolean): actor is ActorPF2e;
export { canObserveActor, getCurrentUser, getSelectedActor, isPrimaryOwner, isPrimaryUpdater, primaryPlayerOwner, userIsGM, };
