import { getSpellRankLabel, localizer } from ".";
function spellSlotGroupIdToNumber(groupId) {
    if (groupId === "cantrips")
        return 0;
    const numericValue = Number(groupId ?? NaN);
    return numericValue.between(0, 10) ? numericValue : null;
}
/**
 * https://github.com/foundryvtt/pf2e/blob/895e512a3346ae9e7eeafbc59fdbac1b68651afa/src/module/item/spellcasting-entry/collection.ts#L343
 */
function warnInvalidDrop(warning, { spell, groupId }) {
    const localize = localizer("PF2E.Item.Spell.Warning");
    if (warning === "invalid-rank" && typeof groupId === "number") {
        const spellRank = getSpellRankLabel(spell.baseRank);
        const targetRank = getSpellRankLabel(groupId);
        ui.notifications.warn(localize("InvalidRank", { spell: spell.name, spellRank, targetRank }));
    }
    else if (warning === "cantrip-mismatch") {
        const locKey = spell.isCantrip ? "CantripToRankedSlots" : "NonCantripToCantrips";
        ui.notifications.warn(localize(locKey, { spell: spell.name }));
    }
    else if (warning === "invalid-spell") {
        const type = game.i18n.format("PF2E.TraitFocus");
        ui.notifications.warn(localize("WrongSpellType", { type }));
    }
}
export { spellSlotGroupIdToNumber, warnInvalidDrop };
