import { DCOptions, ProficiencyRank, Rarity } from "pf2e-types";
declare function adjustDCByRarity(dc: number, rarity?: Rarity): number;
declare function calculateDC(level: number, { pwol, rarity }?: DCOptions): number;
declare function calculateSimpleDC(rank: ProficiencyRank, { pwol }?: DCOptions): number;
declare function calculateSpellDC(spellLevel: number, { pwol }?: DCOptions): number;
export { adjustDCByRarity, calculateDC, calculateSimpleDC, calculateSpellDC };
