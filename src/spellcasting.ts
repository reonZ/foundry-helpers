import {
    AttributeString,
    CreaturePF2e,
    MagicTradition,
    OneToTen,
    SpellcastingCategory,
    SpellcastingEntrySource,
    SpellcastingEntrySystemSource,
    SpellCollection,
    ZeroToFour,
} from "@7h3laughingman/pf2e-types";

const ROMAN_RANKS = ["", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"] as const;

function getSpellCollectionCls<T extends CreaturePF2e>(actor: T): typeof SpellCollection<T> {
    return actor.spellcasting.get("rituals")!.spells!.constructor as typeof SpellCollection<T>;
}

function getActorMaxRank(actor: CreaturePF2e): OneToTen {
    return Math.max(1, Math.ceil(actor.level / 2)) as OneToTen;
}

function createSpellcastingSource({
    name,
    category,
    attribute,
    flags,
    proficiencyRank,
    proficiencySlug,
    showSlotlessRanks,
    sort,
    tradition,
}: CreateSpellcastingSource): CreatedSpellcastingEntrySource {
    return {
        type: "spellcastingEntry",
        name,
        sort: sort ?? 0,
        system: {
            ability: {
                value: (!proficiencySlug && attribute) || "",
            },
            prepared: {
                value: (category as SpellcastingCategory) ?? "innate",
            },
            showSlotlessLevels: {
                value: showSlotlessRanks ?? false,
            },
            proficiency: {
                value: proficiencyRank ?? 1,
                slug: proficiencySlug ?? "",
            },
            tradition: {
                value: tradition ?? "arcane",
            },
        },
        flags: flags ?? {},
    };
}

type CreatedSpellcastingEntrySource = Omit<PreCreate<SpellcastingEntrySource>, "system"> & {
    system: DeepPartial<SpellcastingEntrySystemSource>;
};

type CreateSpellcastingSource = {
    name: string;
    category?: SpellcastingCategory | "charges";
    sort?: number;
    attribute?: AttributeString | null;
    proficiencySlug?: string;
    showSlotlessRanks?: boolean;
    proficiencyRank?: ZeroToFour | null;
    tradition?: MagicTradition;
    flags?: Record<string, any>;
};

type RomanRank = (typeof ROMAN_RANKS)[number];

export { getSpellCollectionCls, createSpellcastingSource, getActorMaxRank, ROMAN_RANKS };
export type { CreatedSpellcastingEntrySource, CreateSpellcastingSource, RomanRank };
