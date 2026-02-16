import { getActorMaster } from ".";
function isCurrentCombatant(actor) {
    const current = game.combat?.combatant;
    if (!current)
        return false;
    return actor.combatant === current || getActorMaster(actor)?.combatant === current;
}
function isInCombat(actor) {
    return actor.inCombat || !!getActorMaster(actor)?.inCombat;
}
export { isCurrentCombatant, isInCombat };
