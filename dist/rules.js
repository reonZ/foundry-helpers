function getRuleElementCls() {
    return game.pf2e.RuleElement;
}
function ruleElementResolveField(options, context) {
    const BaseSpeedCls = game.pf2e.RuleElements.builtin.BaseSpeed;
    const ResolveFieldCls = BaseSpeedCls.defineSchema().value.constructor;
    return new ResolveFieldCls(options, context);
}
function getChoiceSetSelection(item, { option, flag } = {}) {
    const rules = item._source.system.rules;
    const rule = rules.find((rule) => {
        return rule.key === "ChoiceSet" && (!option || rule.rollOption === option) && (!flag || rule.flag === flag);
    });
    return rule?.selection;
}
export { getChoiceSetSelection, getRuleElementCls, ruleElementResolveField };
