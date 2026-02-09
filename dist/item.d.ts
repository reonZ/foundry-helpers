import { ActorPF2e, ItemInstances, ItemPF2e, ItemType } from "foundry-pf2e";
import { ItemUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";
export declare function findItemWithSourceId<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, uuid: string, type?: TType): ActorItemInstances<TType, TActor> | null;
export declare function getItemSourceId(item: ItemPF2e): ItemUUID;
export declare function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean;
type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends "weapon" | "shield" ? TType | "weapon" | "equipment" : TType];
export {};
