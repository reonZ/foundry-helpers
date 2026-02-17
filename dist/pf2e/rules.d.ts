import { ItemPF2e, ModifierAdjustment, RuleElementSynthetics } from "@7h3laughingman/pf2e-types";
import { RollNotePF2e } from ".";
declare function getChoiceSetSelection<T extends any = string>(item: ItemPF2e, { option, flag }?: {
    option?: string;
    flag?: string;
}): T | undefined;
/**
 * https://github.com/foundryvtt/pf2e/blob/360c60f68dad3cee456f328e48043283939582ec/src/module/rules/helpers.ts#L41
 */
declare function extractModifierAdjustments(adjustmentsRecord: RuleElementSynthetics["modifierAdjustments"], selectors: string[], slug: string): ModifierAdjustment[];
/**
 * https://github.com/foundryvtt/pf2e/blob/5967df95d2645162d06d6ee317e99cf9aa03477e/src/module/rules/helpers.ts#L60
 */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
export { extractModifierAdjustments, extractNotes, getChoiceSetSelection };
