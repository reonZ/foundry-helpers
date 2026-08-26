declare const CAST_A_SPELL_OPTION = "origin:action:slug:cast-a-spell";
declare const MAGIC_TRADITIONS: Set<"arcane" | "divine" | "occult" | "primal">;
/**
 * https://github.com/foundryvtt/pf2e/blob/5ebcd0359d1358bb00b76c47e7b84289239234b9/src/module/item/spellcasting-entry/helpers.ts#L43
 */
declare function getSpellRankLabel(group: "cantrips" | number): string;
export { CAST_A_SPELL_OPTION, getSpellRankLabel, MAGIC_TRADITIONS };
