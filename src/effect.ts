import {
    AbstractEffectPF2e,
    ActorPF2e,
    ConditionSlug,
    DurationData,
    EffectBadgeSource,
    EffectSource,
    GrantItemSource,
    RuleElementSource,
} from "@7h3laughingman/pf2e-types";
import { ImageFilePath } from ".";

function createCustomEffect({
    badge,
    duration,
    img,
    itemSlug,
    name,
    rules,
    show,
    unidentified,
}: CustomEffectOptions): WithRequired<PreCreate<EffectSource>, "system"> {
    const system: DeepPartial<EffectSource["system"]> = {
        unidentified,
        duration,
        tokenIcon: { show },
    };

    if (rules?.length) {
        system.rules = rules;
    }

    if (itemSlug) {
        system.slug = itemSlug;
    }

    if (badge) {
        system.badge = badge;
    }

    if (duration?.origin) {
        const { actor, token } = duration.origin;

        system.context = {
            origin: {
                actor: actor.uuid,
                token: token?.uuid ?? actor.token?.uuid ?? null,
                item: null,
                spellcasting: null,
            },
            roll: null,
            target: null,
        };
    }

    return {
        type: "effect",
        name,
        img,
        system,
    };
}

function createCustomCondition(options: CustomConditionOptions): PreCreate<EffectSource> | undefined {
    const { alterations = [], counter = 1, img, name, slug } = options;
    const condition = game.pf2e.ConditionManager.conditions.get(slug);
    if (!condition) return;

    if (
        // we do not handle dying or unconcious condition+effect combo
        ["dying", "unconscious"].includes(slug) ||
        (slug === "persistent-damage" && !alterations.length)
    ) {
        return;
    }

    const rule: GrantItemSource & { alterations: Record<string, JSONValue>[] } = {
        key: "GrantItem",
        uuid: condition.uuid,
        onDeleteActions: {
            grantee: "restrict",
        },
        alterations,
    };

    if (condition.system.value.isValued && counter > 1) {
        rule.inMemoryOnly = true;
        rule.alterations.push({
            mode: "override",
            property: "badge-value",
            value: counter,
        });
    }

    return createCustomEffect({
        ...options,
        name: name || `${game.i18n.localize("TYPES.Item.effect")}: ${condition.name}`,
        img: img || condition.img,
        rules: [rule],
        show: false,
    });
}

type CustomEffectOptions = {
    badge?: DeepPartial<EffectBadgeSource>;
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
    user: { isGM: boolean };
}

interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}

export { createCustomCondition, createCustomEffect };
export type { CustomConditionOptions, CustomEffectDuration, CustomEffectOptions, EffectsPanelViewData, EffectViewData };
