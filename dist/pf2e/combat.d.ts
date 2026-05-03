import { EncounterPF2e, RolledCombatant } from "@7h3laughingman/pf2e-types";
/**
 * https://github.com/foundryvtt/pf2e/blob/a3856b6ae9c0427267b410bb81ff8d4cfefbeab4/src/module/apps/sidebar/encounter-tracker.ts#L341
 */
declare function setInitiativeFromDrop(combat: EncounterPF2e, newOrder: RolledCombatant<EncounterPF2e>[], dropped: RolledCombatant<EncounterPF2e>): void;
/**
 * https://github.com/foundryvtt/pf2e/blob/a3856b6ae9c0427267b410bb81ff8d4cfefbeab4/src/module/apps/sidebar/encounter-tracker.ts#L376
 */
declare function saveNewInitiativeOrder(combat: EncounterPF2e, newOrder: RolledCombatant<EncounterPF2e>[]): Promise<void>;
export { saveNewInitiativeOrder, setInitiativeFromDrop };
