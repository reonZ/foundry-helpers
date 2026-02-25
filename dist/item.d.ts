import { ActorPF2e, CharacterPF2e, ConsumablePF2e, CreaturePF2e, EquipmentPF2e, ItemInstances, ItemPF2e, ItemSourcePF2e, ItemType, PhysicalItemPF2e, ZeroToTwo } from "@7h3laughingman/pf2e-types";
import { CompendiumIndexData, ItemUUID } from ".";
/**
 * https://github.com/foundryvtt/pf2e/blob/1465f7190b2b8454094c50fa6d06e9902e0a3c41/src/module/item/base/data/values.ts#L23-L31
 */
declare const ITEM_CARRY_TYPES: readonly ["attached", "dropped", "held", "implanted", "installed", "stowed", "worn"];
declare const ATTACHABLE_TYPES: {
    readonly ammo: readonly ["weapon"];
    readonly equipment: readonly ["weapon", "armor", "shield"];
    readonly weapon: readonly ["shield"];
};
/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/helpers.ts#L13
 */
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(item: ItemOrSource, ...types: TType[]): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(item: ItemOrSource, ...types: TType[]): item is TType extends "physical" ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"] : TType extends ItemType ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"] : never;
declare function itemIsOfType<TParent extends ActorPF2e | null>(item: ItemOrSource, type: "physical"): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
declare function getItemSource<T extends ItemPF2e>(item: T, clearId?: boolean): T["_source"];
declare function getItemFromUuid<T extends ItemType>(uuid: Maybe<string>, type: T): Promise<ItemInstances<ActorPF2e>[T] | null>;
declare function getItemFromUuid(uuid: Maybe<string>, type: "physical"): Promise<PhysicalItemPF2e<ActorPF2e> | null>;
declare function getItemFromUuid(uuid: Maybe<string>, type?: ItemType | "physical"): Promise<ItemPF2e | null>;
declare function getItemSourceFromUuid<T extends ItemType>(uuid: string, type: T): Promise<ItemInstances<ActorPF2e>[T]["_source"] | null>;
declare function getItemSourceFromUuid(uuid: string, type: "physical"): Promise<PhysicalItemPF2e["_source"] | null>;
declare function getItemSourceFromUuid(uuid: string, type?: ItemType | "physical"): Promise<ItemSourcePF2e | null>;
declare function actorItems<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, type?: TType | TType[]): Generator<ActorItemInstances<TType extends AttachableType ? TType | AttachToType<TType> : TType, TActor>>;
declare function findItemWithSourceId<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, uuid: string, type?: TType): ActorItemInstances<TType, TActor> | null;
declare function findItemWithSlug<TType extends ItemType, TActor extends ActorPF2e>(actor: TActor, slug: string, type?: TType): ActorItemInstances<TType, TActor> | null;
declare function hasAnyItemWithSourceId(actor: ActorPF2e, uuids: string[], type?: ItemType): boolean;
declare function getItemSourceId(item: ItemPF2e): ItemUUID;
declare function getItemSlug(item: ItemPF2e | CompendiumIndexData): string;
declare function itemWithActor<T extends ItemPF2e<ActorPF2e>>(actor: ActorPF2e, item: ItemPF2e): T;
declare function usePhysicalItem(event: Event, item: EquipmentPF2e<ActorPF2e> | ConsumablePF2e<ActorPF2e>): Promise<unknown>;
/**
 * upgraded version of
 * https://github.com/foundryvtt/pf2e/blob/eecf53f37490cbd228d8c74b290748b0188768b4/src/module/item/consumable/document.ts#L156
 * though stripped of scrolls & wands
 */
declare function consumeItem(event: Event, item: ConsumablePF2e<ActorPF2e>): Promise<void>;
declare function getEquipAnnotation(item: Maybe<PhysicalItemPF2e>): EquipAnnotationData | undefined;
/**
 * repurposed version of
 * https://github.com/foundryvtt/pf2e/blob/6ff777170c93618f234929c6d483a98a37cbe363/src/module/actor/character/helpers.ts#L210
 */
declare function equipItemToUse(actor: CharacterPF2e, item: PhysicalItemPF2e<CreaturePF2e>, { carryType, handsHeld, fullAnnotation, cost, }: Pick<EquipAnnotationData, "carryType" | "handsHeld" | "fullAnnotation" | "cost">): Promise<void>;
declare function simulateDropItem(item: ItemPF2e, target: ActorPF2e, fromInventory: boolean): void;
declare function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean;
declare function isCastConsumable(item: ConsumablePF2e): boolean;
declare function isSF2eItem<T extends PhysicalItemPF2e>(item: T): boolean;
declare function isAreaOrAutoFireType(type: string): type is "area-fire" | "auto-fire";
type AttachableType = keyof typeof ATTACHABLE_TYPES;
type AttachToType<T extends AttachableType> = (typeof ATTACHABLE_TYPES)[T][number];
type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends "weapon" | "shield" ? TType | "weapon" | "equipment" : TType];
type ItemOrSource = PreCreate<ItemSourcePF2e> | CompendiumIndexData | ItemPF2e;
type EquipAnnotationData = {
    annotation: AuxiliaryAnnotation;
    cost: 1 | 2;
    fullAnnotation: string;
    handsHeld: ZeroToTwo;
    label: string;
    carryType: "held" | "worn";
};
type AuxiliaryAnnotation = "draw" | "pick-up" | "retrieve" | "sheathe";
export { actorItems, consumeItem, equipItemToUse, findItemWithSlug, findItemWithSourceId, getEquipAnnotation, getItemFromUuid, getItemSlug, getItemSource, getItemSourceFromUuid, getItemSourceId, hasAnyItemWithSourceId, isAreaOrAutoFireType, isCastConsumable, isSF2eItem, isSupressedFeat, ITEM_CARRY_TYPES, itemIsOfType, itemWithActor, simulateDropItem, usePhysicalItem, };
export type { EquipAnnotationData, ItemOrSource };
