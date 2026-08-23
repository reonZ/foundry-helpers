import { ActorGroupUpdate, ActorPF2e } from "@7h3laughingman/pf2e-types";
/** https://github.com/foundryvtt/pf2e/src/module/actor/helpers.ts */
declare function createActorGroupUpdate(data?: Partial<ActorGroupUpdate>): ActorGroupUpdate;
/** https://github.com/foundryvtt/pf2e/src/module/actor/helpers.ts */
declare function applyActorGroupUpdate(actor: ActorPF2e, data: Partial<ActorGroupUpdate>, { render, keepId }?: {
    render?: boolean;
    keepId?: boolean;
}): Promise<void>;
export { applyActorGroupUpdate, createActorGroupUpdate };
