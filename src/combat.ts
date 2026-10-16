import { ActorPF2e, CombatantPF2e, EncounterPF2e, RolledCombatant } from "@7h3laughingman/pf2e-types";
import { getActorMaster } from ".";

function isCurrentCombatant(actor: Actor): boolean {
    return !!game.combat?.combatants.some((combatant) => combatant.actor?.uuid === actor.uuid);
}

function isInCombat(actor: ActorPF2e): boolean {
    return actor.inCombat || !!getActorMaster(actor)?.inCombat;
}

function hasRolledInitiative(combatant: CombatantPF2e): combatant is RolledCombatant<EncounterPF2e> {
    return typeof combatant.initiative === "number";
}

export { hasRolledInitiative, isCurrentCombatant, isInCombat };
