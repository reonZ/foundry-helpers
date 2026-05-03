import { EncounterPF2e, RolledCombatant } from "@7h3laughingman/pf2e-types";
import { SYSTEM } from "../system";

/**
 * https://github.com/foundryvtt/pf2e/blob/a3856b6ae9c0427267b410bb81ff8d4cfefbeab4/src/module/apps/sidebar/encounter-tracker.ts#L341
 */
function setInitiativeFromDrop(
    combat: EncounterPF2e,
    newOrder: RolledCombatant<EncounterPF2e>[],
    dropped: RolledCombatant<EncounterPF2e>,
): void {
    const aboveDropped = newOrder.find((c) => newOrder.indexOf(c) === newOrder.indexOf(dropped) - 1);
    const belowDropped = newOrder.find((c) => newOrder.indexOf(c) === newOrder.indexOf(dropped) + 1);

    const hasAboveAndBelow = !!aboveDropped && !!belowDropped;
    const hasAboveAndNoBelow = !!aboveDropped && !belowDropped;
    const hasBelowAndNoAbove = !aboveDropped && !!belowDropped;
    const aboveIsHigherThanBelow = hasAboveAndBelow && belowDropped.initiative < aboveDropped.initiative;
    const belowIsHigherThanAbove = hasAboveAndBelow && belowDropped.initiative < aboveDropped.initiative;
    const wasDraggedUp = !!belowDropped && combat.getCombatantWithHigherInit(dropped, belowDropped) === belowDropped;
    const wasDraggedDown = !!aboveDropped && !wasDraggedUp;

    // Set a new initiative intuitively, according to allegedly commonplace intuitions
    dropped.initiative =
        hasBelowAndNoAbove || (aboveIsHigherThanBelow && wasDraggedUp)
            ? belowDropped.initiative + 1
            : hasAboveAndNoBelow || (belowIsHigherThanAbove && wasDraggedDown)
              ? aboveDropped.initiative - 1
              : hasAboveAndBelow
                ? belowDropped.initiative
                : dropped.initiative;

    const withSameInitiative = newOrder.filter((c) => c.initiative === dropped.initiative);
    if (withSameInitiative.length > 1) {
        for (let priority = 0; priority < withSameInitiative.length; priority++) {
            const flag = withSameInitiative[priority].flags[SYSTEM.id];
            flag.overridePriority[dropped.initiative] = priority;
        }
    }
}

/**
 * https://github.com/foundryvtt/pf2e/blob/a3856b6ae9c0427267b410bb81ff8d4cfefbeab4/src/module/apps/sidebar/encounter-tracker.ts#L376
 */
async function saveNewInitiativeOrder(
    combat: EncounterPF2e,
    newOrder: RolledCombatant<EncounterPF2e>[],
): Promise<void> {
    await combat.setMultipleInitiatives(
        newOrder.map((c) => ({
            id: c.id,
            value: c.initiative,
            overridePriority: c.overridePriority(c.initiative),
        })),
    );
}

export { saveNewInitiativeOrder, setInitiativeFromDrop };
