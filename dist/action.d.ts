import { AbilityItemPF2e, ActionCost, ActorPF2e, FeatPF2e } from "foundry-pf2e";
/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/util/misc.ts#L205
 */
export declare function getActionGlyph(action: string | number | null | ActionCost): string;
export declare function useAction(event: Event, item: AbilityItemPF2e<ActorPF2e> | FeatPF2e<ActorPF2e>): Promise<unknown>;
export declare function applySelfEffect(item: AbilityItemPF2e<ActorPF2e> | FeatPF2e<ActorPF2e>): Promise<void>;
export declare function isDefaultActionIcon(img: string, action: string | ActionCost | null): boolean;
