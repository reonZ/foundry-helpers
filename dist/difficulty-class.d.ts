import { DCOptions, ProficiencyRank, Rarity } from "foundry-pf2e";
export declare function adjustDCByRarity(dc: number, rarity?: Rarity): number;
export declare function calculateDC(level: number, { pwol, rarity }?: DCOptions): number;
export declare function calculateSimpleDC(rank: ProficiencyRank, { pwol }?: DCOptions): number;
export declare function calculateSpellDC(spellLevel: number, { pwol }?: DCOptions): number;
