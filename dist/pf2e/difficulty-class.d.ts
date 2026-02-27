import { CreaturePF2e, DCOptions, ProficiencyRank, Rarity } from "@7h3laughingman/pf2e-types";
declare function adjustDCByRarity(dc: number, rarity?: Rarity): number;
declare function calculateDC(level: number, { pwol, rarity }?: DCOptions): number;
declare function calculateSimpleDC(rank: ProficiencyRank, { pwol }?: DCOptions): number;
declare function calculateSpellDC(spellLevel: number, { pwol }?: DCOptions): number;
declare function calculateCreatureDC(actor: CreaturePF2e, pwol?: boolean): number;
export { adjustDCByRarity, calculateCreatureDC, calculateDC, calculateSimpleDC, calculateSpellDC };
