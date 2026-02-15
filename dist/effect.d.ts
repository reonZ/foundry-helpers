import { AbstractEffectPF2e, ActorPF2e, ConditionSlug, DurationData, EffectBadgeSource, EffectSource, RuleElementSource } from "@7h3laughingman/pf2e-types";
import { ImageFilePath } from ".";
declare function createCustomEffect({ badge, duration, img, itemSlug, name, rules, show, unidentified, }: CustomEffectOptions): WithRequired<PreCreate<EffectSource>, "system">;
declare function createCustomCondition(options: CustomConditionOptions): PreCreate<EffectSource> | undefined;
type CustomEffectOptions = {
    badge?: EffectBadgeSource;
    duration?: CustomEffectDuration;
    img?: ImageFilePath;
    name: string;
    rules?: RuleElementSource[];
    show?: boolean;
    itemSlug?: string;
    unidentified?: boolean;
};
type CustomConditionOptions = Omit<WithPartial<CustomEffectOptions, "name">, "badge" | "rules" | "show"> & {
    slug: ConditionSlug;
    counter?: number;
    alterations?: Record<string, JSONValue>[];
};
type CustomEffectDuration = DurationData & {
    origin?: TargetDocuments;
};
interface EffectsPanelViewData {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export { createCustomCondition, createCustomEffect };
export type { CustomConditionOptions, CustomEffectOptions, EffectsPanelViewData, EffectViewData };
