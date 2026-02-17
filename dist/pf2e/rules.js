import { R } from "..";
function getChoiceSetSelection(item, { option, flag } = {}) {
    const rules = item._source.system.rules;
    const rule = rules.find((rule) => {
        return rule.key === "ChoiceSet" && (!option || rule.rollOption === option) && (!flag || rule.flag === flag);
    });
    return rule?.selection;
}
/**
 * https://github.com/foundryvtt/pf2e/blob/360c60f68dad3cee456f328e48043283939582ec/src/module/rules/helpers.ts#L41
 */
function extractModifierAdjustments(adjustmentsRecord, selectors, slug) {
    const adjustments = R.unique(selectors.flatMap((s) => adjustmentsRecord[s] ?? []));
    return adjustments.filter((a) => [slug, null].includes(a.slug));
}
/**
 * https://github.com/foundryvtt/pf2e/blob/5967df95d2645162d06d6ee317e99cf9aa03477e/src/module/rules/helpers.ts#L60
 */
function extractNotes(rollNotes, selectors) {
    return selectors.flatMap((s) => (rollNotes[s] ?? []).map((n) => n.clone()));
}
export { extractModifierAdjustments, extractNotes, getChoiceSetSelection };
