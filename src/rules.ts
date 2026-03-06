import { ChoiceSetSource, ItemPF2e, RuleElementSource } from "@7h3laughingman/pf2e-types";

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

export { getChoiceSetSelection };
