import {
    ActorPF2e,
    ConsumablePF2e,
    EquipmentPF2e,
    ItemInstances,
    ItemPF2e,
    ItemSourcePF2e,
    ItemType,
    PhysicalItemPF2e,
} from "foundry-pf2e";
import { ItemSheetData as _ItemSheetData } from "foundry-pf2e/foundry/client/appv1/sheets/item-sheet.mjs";
import { ItemUUID as _ItemUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";
import { createHTMLElementContent, getDamageRollClass, htmlQuery, includesAny, R, setHasElement, SYSTEM } from ".";
import { CompendiumIndexData as _CompendiumIndexData } from "foundry-pf2e/foundry/client/documents/collections/_module.mjs";

/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/physical/values.ts#L1
 */
const PHYSICAL_ITEM_TYPES = new Set([
    "ammo",
    "armor",
    "backpack",
    "book",
    "consumable",
    "equipment",
    "shield",
    "treasure",
    "weapon",
] as const);

const ATTACHABLE_TYPES = {
    ammo: ["weapon"],
    equipment: ["weapon", "armor", "shield"],
    weapon: ["shield"],
} as const;

/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/helpers.ts#L13
 */
export function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(
    item: ItemOrSource,
    ...types: TType[]
): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
export function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(
    item: ItemOrSource,
    ...types: TType[]
): item is TType extends "physical"
    ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"]
    : TType extends ItemType
      ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"]
      : never;
export function itemIsOfType<TParent extends ActorPF2e | null>(
    item: ItemOrSource,
    type: "physical",
): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
export function itemIsOfType(item: ItemOrSource, ...types: string[]): boolean {
    return (
        typeof item.name === "string" &&
        types.some((t) => (t === "physical" ? setHasElement(PHYSICAL_ITEM_TYPES, item.type) : item.type === t))
    );
}

function* actorItems<TType extends ItemType, TActor extends ActorPF2e>(
    actor: TActor,
    type?: TType | TType[],
): Generator<ActorItemInstances<TType extends AttachableType ? TType | AttachToType<TType> : TType, TActor>> {
    const types = R.isArray(type) ? type : type ? [type] : R.keys(CONFIG.PF2E.Item.documentClasses);

    // we must add parent types for subitems lookup
    const attachables = type && types.filter((t): t is AttachableType => t in ATTACHABLE_TYPES);
    if (attachables?.length) {
        for (const attachType of attachables) {
            for (const attachToType of ATTACHABLE_TYPES[attachType]) {
                if (!types.includes(attachToType)) {
                    types.push(attachToType);
                }
            }
        }
    }

    for (const itemType of types) {
        for (const item of actor.itemTypes[itemType]) {
            yield item as any;

            // we also yield subitems because they are unnaccessible otherwise
            if ("subitems" in item) {
                for (const subitem of item.subitems) {
                    yield subitem as any;
                }
            }
        }
    }
}

export function findItemWithSourceId<TType extends ItemType, TActor extends ActorPF2e>(
    actor: TActor,
    uuid: string,
    type?: TType,
): ActorItemInstances<TType, TActor> | null {
    for (const item of actorItems(actor, type)) {
        if (isSupressedFeat(item)) continue;

        const sourceId = getItemSourceId(item);
        if (sourceId === uuid) {
            return item as any;
        }
    }

    return null;
}

export function getItemSourceId(item: ItemPF2e): ItemUUID {
    const isCompendiumItem = item._id && item.pack && !item.isEmbedded;
    return isCompendiumItem ? item.uuid : (item._stats.compendiumSource ?? item._stats.duplicateSource ?? item.uuid);
}

export async function usePhysicalItem(event: Event, item: EquipmentPF2e<ActorPF2e> | ConsumablePF2e<ActorPF2e>) {
    const isConsumable = item.isOfType("consumable");

    if (isConsumable && isCastConsumable(item)) {
        return item.consume();
    }

    const macro = game.toolbelt?.getToolSetting("actionable", "item")
        ? await game.toolbelt.api.actionable.getItemMacro(item)
        : undefined;

    const use = isConsumable ? () => consumeItem(event, item) : () => game.pf2e.rollItemMacro(item.uuid, event);

    if (macro) {
        // we let the macro handle item consumption
        return macro.execute({
            actor: item.actor,
            item,
            use,
            cancel: () => {
                const msg = game.toolbelt!.localize("actionable.item.cancel", item);
                return ui.notifications.warn(msg, { localize: false });
            },
        });
    }

    return use();
}

/**
 * upgraded version of
 * https://github.com/foundryvtt/pf2e/blob/eecf53f37490cbd228d8c74b290748b0188768b4/src/module/item/consumable/document.ts#L156
 * though stripped of scrolls & wands
 */
export async function consumeItem(event: Event, item: ConsumablePF2e<ActorPF2e>) {
    const actor = item.actor;
    const speaker = ChatMessage.getSpeaker({ actor });
    const flags = {
        [SYSTEM.id]: {
            origin: {
                sourceId: item.sourceId,
                uuid: item.uuid,
                type: item.type,
            },
        },
    };

    const contentHTML = createHTMLElementContent({
        content: (await item.toMessage(event, { create: false }))?.content,
    });

    htmlQuery(contentHTML, "footer")?.remove();
    htmlQuery(contentHTML, "button[data-action='consume']")?.remove();

    const uses = item.uses;
    const content = contentHTML.outerHTML;

    if (item.system.damage) {
        const DamageRoll = getDamageRollClass();
        const { formula, type, kind } = item.system.damage;
        const roll = new DamageRoll(`(${formula})[${type},${kind}]`);

        roll.toMessage({ speaker, flavor: content, flags });
    } else {
        const key = uses.max > 1 && uses.value > 1 ? "UseMulti" : "UseSingle";
        const use = game.i18n.format(`PF2E.ConsumableMessage.${key}`, {
            name: item.name,
            current: uses.value - 1,
        });
        const flavor = `<h4 style="margin-bottom: .3em; font-size: 1.3em;">${use}</h4>`;

        ChatMessage.create({ speaker, content: `${flavor}${content}`, flags });
    }

    if (item.system.uses.autoDestroy && uses.value <= 1) {
        const newQuantity = Math.max(item.quantity - 1, 0);
        if (newQuantity <= 0) {
            await item.delete();
        } else {
            await item.update({
                "system.quantity": newQuantity,
                "system.uses.value": uses.max,
            });
        }
    } else {
        await item.update({
            "system.uses.value": Math.max(uses.value - 1, 0),
        });
    }
}

export function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean {
    return item.isOfType("feat") && item.suppressed;
}

export function isCastConsumable(item: ConsumablePF2e): boolean {
    return R.isIncludedIn(item.category, ["wand", "scroll"]) && !!item.system.spell;
}

export function isSF2eItem<T extends PhysicalItemPF2e>(item: T): boolean {
    return includesAny(item._source.system.traits.value, ["tech", "analog"]);
}

type AttachableType = keyof typeof ATTACHABLE_TYPES;
type AttachToType<T extends AttachableType> = (typeof ATTACHABLE_TYPES)[T][number];

type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends
    | "weapon"
    | "shield"
    ? TType | "weapon" | "equipment"
    : TType];

export type ItemSheetData<TItem extends Item> = _ItemSheetData<TItem>;
export type ItemUUID = _ItemUUID;
export type ItemOrSource = PreCreate<ItemSourcePF2e> | CompendiumIndexData | ItemPF2e;
export type CompendiumIndexData = _CompendiumIndexData;
