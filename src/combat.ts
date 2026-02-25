import { ActorPF2e, CombatantPF2e, EncounterPF2e, RolledCombatant } from "@7h3laughingman/pf2e-types";
import { getActorMaster } from ".";

function isCurrentCombatant(actor: ActorPF2e): boolean {
    const current = game.combat?.combatant;
    if (!current) return false;

    return actor.combatant === current || getActorMaster(actor)?.combatant === current;
}

function isInCombat(actor: ActorPF2e): boolean {
    return actor.inCombat || !!getActorMaster(actor)?.inCombat;
}

function hasRolledInitiative(combatant: CombatantPF2e): combatant is RolledCombatant<EncounterPF2e> {
    return typeof combatant.initiative === "number";
}

export { hasRolledInitiative, isCurrentCombatant, isInCombat };
