import { AbstractEffectPF2e, ActorPF2e, ConditionSlug, DurationData, EffectBadgeSource, EffectSource, RuleElementSource } from "foundry-pf2e";
import { ImageFilePath } from "foundry-pf2e/foundry/common/constants.mjs";
export declare function createCustomEffect({ badge, duration, img, itemSlug, name, rules, show, unidentified, }: CustomEffectOptions): WithRequired<PreCreate<EffectSource>, "system">;
export declare function createCustomCondition(options: CustomConditionOptions): PreCreate<EffectSource> | undefined;
export type CustomEffectOptions = {
    badge?: EffectBadgeSource;
    duration?: CustomEffectDuration;
    img?: ImageFilePath;
    name: string;
    rules?: RuleElementSource[];
    show?: boolean;
    itemSlug?: string;
    unidentified?: boolean;
};
export type CustomConditionOptions = Omit<WithPartial<CustomEffectOptions, "name">, "badge" | "rules" | "show"> & {
    slug: ConditionSlug;
    counter?: number;
    alterations?: Record<string, JSONValue>[];
};
type CustomEffectDuration = DurationData & {
    origin?: TargetDocuments;
};
export interface EffectsPanelViewData {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
export interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export {};
