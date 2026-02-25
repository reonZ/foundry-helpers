import { ActorPF2e, CombatantPF2e, EncounterPF2e, RolledCombatant } from "@7h3laughingman/pf2e-types";
declare function isCurrentCombatant(actor: ActorPF2e): boolean;
declare function isInCombat(actor: ActorPF2e): boolean;
declare function hasRolledInitiative(combatant: CombatantPF2e): combatant is RolledCombatant<EncounterPF2e>;
export { hasRolledInitiative, isCurrentCombatant, isInCombat };
