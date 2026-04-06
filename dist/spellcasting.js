const ROMAN_RANKS = ["", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"];
function getActorMaxRank(actor) {
    return Math.max(1, Math.ceil(actor.level / 2));
}
function createSpellcastingSource({ name, category, attribute, flags, proficiencyRank, proficiencySlug, showSlotlessRanks, sort, tradition, }) {
    return {
        type: "spellcastingEntry",
        name,
        sort: sort ?? 0,
        system: {
            ability: {
                value: (!proficiencySlug && attribute) || "",
            },
            prepared: {
                value: category ?? "innate",
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
export { createSpellcastingSource, getActorMaxRank, ROMAN_RANKS };
