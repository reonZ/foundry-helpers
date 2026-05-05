import { DataFieldOptions } from "@7h3laughingman/foundry-types/common/data/_types.mjs";
import { ItemPF2e, ResolvableValueField, RuleElement, RuleValue } from "@7h3laughingman/pf2e-types";
declare function getRuleElementCls(): typeof RuleElement;
declare function ruleElementResolveField<TRequired extends boolean, TNullable extends boolean, THasInitial extends boolean = false>(options?: DataFieldOptions<RuleValue, TRequired, TNullable, THasInitial> | undefined, context?: foundry.data.DataFieldContext): ResolvableValueField<TRequired, TNullable, THasInitial>;
declare function getChoiceSetSelection<T extends any = string>(item: ItemPF2e, { option, flag }?: {
    option?: string;
    flag?: string;
}): T | undefined;
export { getChoiceSetSelection, getRuleElementCls, ruleElementResolveField };
