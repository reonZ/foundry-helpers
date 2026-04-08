import {
    CreaturePF2e,
    SpellcastingEntry,
    SpellPF2e,
    SpellSlotGroupId,
    Statistic,
    ZeroToTen,
} from "@7h3laughingman/pf2e-types";
import { getSpellRankLabel, localizer } from ".";
import { R } from "..";

const SPELLCASTING_CATEGORIES = ["prepared", "spontaneous", "innate", "focus", "items", "ritual"] as const;

/**
 * https://github.com/foundryvtt/pf2e/blob/895e512a3346ae9e7eeafbc59fdbac1b68651afa/src/module/item/spellcasting-entry/helpers.ts#L29
 */
function spellSlotGroupIdToNumber(groupId: SpellSlotGroupId): ZeroToTen;
function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null;
function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null {
    if (groupId === "cantrips") return 0;
    const numericValue = Number(groupId ?? NaN);
    return numericValue.between(0, 10) ? (numericValue as ZeroToTen) : null;
}

/**
 * https://github.com/foundryvtt/pf2e/blob/895e512a3346ae9e7eeafbc59fdbac1b68651afa/src/module/item/spellcasting-entry/collection.ts#L343
 */
function warnInvalidDrop(warning: DropWarningType, { spell, groupId }: WarnInvalidDropParams): void {
    const localize = localizer("PF2E.Item.Spell.Warning");
    if (warning === "invalid-rank" && typeof groupId === "number") {
        const spellRank = getSpellRankLabel(spell.baseRank);
        const targetRank = getSpellRankLabel(groupId);
        ui.notifications.warn(localize("InvalidRank", { spell: spell.name, spellRank, targetRank }));
    } else if (warning === "cantrip-mismatch") {
        const locKey = spell.isCantrip ? "CantripToRankedSlots" : "NonCantripToCantrips";
        ui.notifications.warn(localize(locKey, { spell: spell.name }));
    } else if (warning === "invalid-spell") {
        const type = game.i18n.format("PF2E.TraitFocus");
        ui.notifications.warn(localize("WrongSpellType", { type }));
    }
}

/**
 * https://github.com/foundryvtt/pf2e/blob/49dc6d70c7e7bb26d8039c97361e638bdef6a3bd/src/module/item/spellcasting-entry/helpers.ts#L10
 */
function createCounteractStatistic<TActor extends CreaturePF2e>(ability: SpellcastingEntry<TActor>): Statistic<TActor> {
    const actor = ability.actor;

    // NPCs have neither a proficiency bonus nor specified attribute modifier: use their base attack roll modifier
    const baseModifier = actor.isOfType("npc")
        ? ability.statistic.check.modifiers.find((m) => m.type === "untyped" && m.slug === "base")?.clone()
        : null;

    const StatisticCls = actor.skills.acrobatics.constructor as typeof Statistic;
    return new StatisticCls(actor, {
        slug: "counteract",
        label: "PF2E.Item.Spell.Counteract.Label",
        attribute: ability.statistic.attribute,
        rank: ability.statistic.rank || 1,
        check: { type: "check", modifiers: [baseModifier].filter(R.isTruthy) },
    });
}

type DropWarningType = "invalid-rank" | "cantrip-mismatch" | "invalid-spell";

interface WarnInvalidDropParams {
    spell: SpellPF2e;
    groupId?: Maybe<SpellSlotGroupId>;
}

export { createCounteractStatistic, SPELLCASTING_CATEGORIES, spellSlotGroupIdToNumber, warnInvalidDrop };
