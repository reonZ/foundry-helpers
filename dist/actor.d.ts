import { ActorAlliance, ActorPF2e, ActorSizePF2e, CharacterPF2e, CreaturePF2e, LootPF2e, ValueAndMax } from "@7h3laughingman/pf2e-types";
declare const PARTY_ACTOR_ID = "xxxPF2ExPARTYxxx";
declare function getDispositionColor(actor?: ActorPF2e | null): foundry.utils.Color;
declare function actorsRespectAlliance(origin: ActorPF2e, target: ActorPF2e, alliance?: ActorTargetAlliance): boolean;
declare function belongToPartyAlliance(actor: ActorPF2e): boolean;
declare function oppositeAlliance(alliance: ActorAlliance): "party" | "opposition" | null;
declare function isAllyActor(actor: ActorPF2e): boolean;
declare function isMerchant(actor: Maybe<ActorPF2e>): actor is LootPF2e;
declare function getMythicOrHeroPoints(actor: CharacterPF2e): MythicOrHeroPoints;
declare function getActorMaster(actor: Maybe<ActorPF2e>): ActorPF2e | null;
declare function getActorSize(actor: CreaturePF2e): ActorSizePF2e;
type ActorTargetAlliance = "all" | "allies" | "enemies";
type MythicOrHeroPoints = ValueAndMax & {
    name: "mythicPoints" | "heroPoints";
    slug: "mythic-points" | "hero-points";
};
export { actorsRespectAlliance, belongToPartyAlliance, getActorMaster, getActorSize, getDispositionColor, getMythicOrHeroPoints, isAllyActor, isMerchant, oppositeAlliance, PARTY_ACTOR_ID, };
export type { ActorTargetAlliance, MythicOrHeroPoints };
