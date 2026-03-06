function getChoiceSetSelection(item, { option, flag } = {}) {
    const rules = item._source.system.rules;
    const rule = rules.find((rule) => {
        return rule.key === "ChoiceSet" && (!option || rule.rollOption === option) && (!flag || rule.flag === flag);
    });
    return rule?.selection;
}
export { getChoiceSetSelection };
