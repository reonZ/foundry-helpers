import { AttributeString, CreaturePF2e, MagicTradition, OneToTen, SpellcastingCategory, SpellcastingEntrySource, SpellcastingEntrySystemSource, ZeroToFour } from "@7h3laughingman/pf2e-types";
declare function getActorMaxRank(actor: CreaturePF2e): OneToTen;
declare function createSpellcastingSource({ name, category, attribute, flags, proficiencyRank, proficiencySlug, showSlotlessRanks, sort, tradition, }: CreateSpellcastingSource): CreatedSpellcastingEntrySource;
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
export { createSpellcastingSource, getActorMaxRank };
export type { CreatedSpellcastingEntrySource, CreateSpellcastingSource };
