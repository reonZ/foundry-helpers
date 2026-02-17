import {
    ChoiceSetSource,
    ItemPF2e,
    ModifierAdjustment,
    RuleElementSource,
    RuleElementSynthetics,
} from "@7h3laughingman/pf2e-types";
import { RollNotePF2e } from ".";
import { R } from "..";

function getChoiceSetSelection<T extends any = string>(
    item: ItemPF2e,
    { option, flag }: { option?: string; flag?: string } = {},
) {
    const rules = item._source.system.rules as RuleElementSource[];
    const rule = rules.find((rule: ChoiceSetSource): rule is ChoiceSetSource => {
        return rule.key === "ChoiceSet" && (!option || rule.rollOption === option) && (!flag || rule.flag === flag);
    });
    return rule?.selection as T | undefined;
}

/**
 * https://github.com/foundryvtt/pf2e/blob/360c60f68dad3cee456f328e48043283939582ec/src/module/rules/helpers.ts#L41
 */
function extractModifierAdjustments(
    adjustmentsRecord: RuleElementSynthetics["modifierAdjustments"],
    selectors: string[],
    slug: string,
): ModifierAdjustment[] {
    const adjustments = R.unique(selectors.flatMap((s) => adjustmentsRecord[s] ?? []));
    return adjustments.filter((a) => [slug, null].includes(a.slug));
}

/**
 * https://github.com/foundryvtt/pf2e/blob/5967df95d2645162d06d6ee317e99cf9aa03477e/src/module/rules/helpers.ts#L60
 */
function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[] {
    return selectors.flatMap((s) => (rollNotes[s] ?? []).map((n) => n.clone()));
}

export { extractModifierAdjustments, extractNotes, getChoiceSetSelection };
