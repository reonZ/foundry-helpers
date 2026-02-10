import { ActorPF2e, ConsumablePF2e, EquipmentPF2e, ItemInstances, ItemPF2e, ItemSourcePF2e, ItemType, PhysicalItemPF2e } from "foundry-pf2e";
import { ItemSheetData as _ItemSheetData } from "foundry-pf2e/foundry/client/appv1/sheets/item-sheet.mjs";
import { ItemUUID as _ItemUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";
import { CompendiumIndexData as _CompendiumIndexData } from "foundry-pf2e/foundry/client/documents/collections/_module.mjs";
/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/helpers.ts#L13
 */
export declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(item: ItemOrSource, ...types: TType[]): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
export declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(item: ItemOrSource, ...types: TType[]): item is TType extends "physical" ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"] : TType extends ItemType ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"] : never;
export declare function itemIsOfType<TParent extends ActorPF2e | null>(item: ItemOrSource, type: "physical"): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
export declare function findItemWithSourceId<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, uuid: string, type?: TType): ActorItemInstances<TType, TActor> | null;
export declare function getItemSourceId(item: ItemPF2e): ItemUUID;
export declare function usePhysicalItem(event: Event, item: EquipmentPF2e<ActorPF2e> | ConsumablePF2e<ActorPF2e>): Promise<unknown>;
/**
 * upgraded version of
 * https://github.com/foundryvtt/pf2e/blob/eecf53f37490cbd228d8c74b290748b0188768b4/src/module/item/consumable/document.ts#L156
 * though stripped of scrolls & wands
 */
export declare function consumeItem(event: Event, item: ConsumablePF2e<ActorPF2e>): Promise<void>;
export declare function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean;
export declare function isCastConsumable(item: ConsumablePF2e): boolean;
type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends "weapon" | "shield" ? TType | "weapon" | "equipment" : TType];
export type ItemSheetData<TItem extends Item> = _ItemSheetData<TItem>;
export type ItemUUID = _ItemUUID;
export type ItemOrSource = PreCreate<ItemSourcePF2e> | CompendiumIndexData | ItemPF2e;
export type CompendiumIndexData = _CompendiumIndexData;
export {};
