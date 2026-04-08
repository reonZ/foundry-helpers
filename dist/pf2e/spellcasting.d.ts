import { CreaturePF2e, SpellcastingEntry, SpellPF2e, SpellSlotGroupId, Statistic, ZeroToTen } from "@7h3laughingman/pf2e-types";
declare const SPELLCASTING_CATEGORIES: readonly ["prepared", "spontaneous", "innate", "focus", "items", "ritual"];
/**
 * https://github.com/foundryvtt/pf2e/blob/895e512a3346ae9e7eeafbc59fdbac1b68651afa/src/module/item/spellcasting-entry/helpers.ts#L29
 */
declare function spellSlotGroupIdToNumber(groupId: SpellSlotGroupId): ZeroToTen;
declare function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null;
/**
 * https://github.com/foundryvtt/pf2e/blob/895e512a3346ae9e7eeafbc59fdbac1b68651afa/src/module/item/spellcasting-entry/collection.ts#L343
 */
declare function warnInvalidDrop(warning: DropWarningType, { spell, groupId }: WarnInvalidDropParams): void;
/**
 * https://github.com/foundryvtt/pf2e/blob/49dc6d70c7e7bb26d8039c97361e638bdef6a3bd/src/module/item/spellcasting-entry/helpers.ts#L10
 */
declare function createCounteractStatistic<TActor extends CreaturePF2e>(ability: SpellcastingEntry<TActor>): Statistic<TActor>;
type DropWarningType = "invalid-rank" | "cantrip-mismatch" | "invalid-spell";
interface WarnInvalidDropParams {
    spell: SpellPF2e;
    groupId?: Maybe<SpellSlotGroupId>;
}
export { createCounteractStatistic, SPELLCASTING_CATEGORIES, spellSlotGroupIdToNumber, warnInvalidDrop };
