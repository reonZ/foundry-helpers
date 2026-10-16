import { getActorMaster } from ".";
function isCurrentCombatant(actor) {
    return !!game.combat?.combatants.some((combatant) => combatant.actor?.uuid === actor.uuid);
}
function isInCombat(actor) {
    return actor.inCombat || !!getActorMaster(actor)?.inCombat;
}
function hasRolledInitiative(combatant) {
    return typeof combatant.initiative === "number";
}
export { hasRolledInitiative, isCurrentCombatant, isInCombat };
