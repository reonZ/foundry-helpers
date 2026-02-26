import { SkillSlug } from "@7h3laughingman/pf2e-types";
declare function getTranslatedSkills(lowercase?: boolean): Record<"performance" | "athletics" | "deception" | "stealth" | "nature" | "crafting" | "acrobatics" | "arcana" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "religion" | "society" | "survival" | "thievery", string>;
declare function getSkillLabel(skill: SkillSlug, localize?: boolean): string;
export { getSkillLabel, getTranslatedSkills };
