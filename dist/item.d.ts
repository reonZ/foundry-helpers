import { ActorPF2e, ConsumablePF2e, EquipmentPF2e, ItemInstances, ItemPF2e, ItemSourcePF2e, ItemType, PhysicalItemPF2e } from "@7h3laughingman/pf2e-types";
import { CompendiumIndexData, ItemUUID } from ".";
/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/helpers.ts#L13
 */
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(item: ItemOrSource, ...types: TType[]): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(item: ItemOrSource, ...types: TType[]): item is TType extends "physical" ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"] : TType extends ItemType ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"] : never;
declare function itemIsOfType<TParent extends ActorPF2e | null>(item: ItemOrSource, type: "physical"): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
declare function findItemWithSourceId<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, uuid: string, type?: TType): ActorItemInstances<TType, TActor> | null;
declare function getItemSourceId(item: ItemPF2e): ItemUUID;
declare function usePhysicalItem(event: Event, item: EquipmentPF2e<ActorPF2e> | ConsumablePF2e<ActorPF2e>): Promise<unknown>;
/**
 * upgraded version of
 * https://github.com/foundryvtt/pf2e/blob/eecf53f37490cbd228d8c74b290748b0188768b4/src/module/item/consumable/document.ts#L156
 * though stripped of scrolls & wands
 */
declare function consumeItem(event: Event, item: ConsumablePF2e<ActorPF2e>): Promise<void>;
declare function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean;
declare function isCastConsumable(item: ConsumablePF2e): boolean;
declare function isSF2eItem<T extends PhysicalItemPF2e>(item: T): boolean;
type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends "weapon" | "shield" ? TType | "weapon" | "equipment" : TType];
type ItemOrSource = PreCreate<ItemSourcePF2e> | CompendiumIndexData | ItemPF2e;
export { consumeItem, findItemWithSourceId, getItemSourceId, isCastConsumable, isSF2eItem, isSupressedFeat, itemIsOfType, usePhysicalItem, };
export type { ItemOrSource };
