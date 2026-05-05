import { DataFieldOptions } from "@7h3laughingman/foundry-types/common/data/_types.mjs";
import {
    BaseSpeedRuleElement,
    ChoiceSetSource,
    ItemPF2e,
    ResolvableValueField,
    RuleElement,
    RuleElementSource,
    RuleValue,
} from "@7h3laughingman/pf2e-types";

function getRuleElementCls(): typeof RuleElement {
    return game.pf2e.RuleElement;
}

function ruleElementResolveField<
    TRequired extends boolean,
    TNullable extends boolean,
    THasInitial extends boolean = false,
>(
    options?: DataFieldOptions<RuleValue, TRequired, TNullable, THasInitial> | undefined,
    context?: foundry.data.DataFieldContext,
): ResolvableValueField<TRequired, TNullable, THasInitial> {
    const BaseSpeedCls = game.pf2e.RuleElements.builtin.BaseSpeed as typeof BaseSpeedRuleElement;
    const ResolveFieldCls = BaseSpeedCls.defineSchema().value.constructor as typeof ResolvableValueField;
    return new ResolveFieldCls(options, context);
}

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

export { getChoiceSetSelection, getRuleElementCls, ruleElementResolveField };
