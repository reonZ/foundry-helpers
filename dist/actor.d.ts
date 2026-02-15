import { ActorAlliance, ActorPF2e, CharacterPF2e, LootPF2e, ValueAndMax } from "@7h3laughingman/pf2e-types";
declare function actorsRespectAlliance(origin: ActorPF2e, target: ActorPF2e, alliance?: ActorTargetAlliance): boolean;
declare function belongToPartyAlliance(actor: ActorPF2e): boolean;
declare function oppositeAlliance(alliance: ActorAlliance): "party" | "opposition" | null;
declare function isAllyActor(actor: ActorPF2e): boolean;
declare function isMerchant(actor: Maybe<ActorPF2e>): actor is LootPF2e;
declare function getMythicOrHeroPoints(actor: CharacterPF2e): MythicOrHeroPoints;
type ActorTargetAlliance = "all" | "allies" | "enemies";
type MythicOrHeroPoints = ValueAndMax & {
    name: "mythicPoints" | "heroPoints";
    slug: "mythic-points" | "hero-points";
};
export { actorsRespectAlliance, belongToPartyAlliance, getMythicOrHeroPoints, isAllyActor, isMerchant, oppositeAlliance, };
export type { ActorTargetAlliance, MythicOrHeroPoints };
