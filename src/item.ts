import { ActorPF2e, ItemInstances, ItemPF2e, ItemType } from "foundry-pf2e";
import { R } from ".";
import { ItemUUID } from "foundry-pf2e/foundry/common/documents/_module.mjs";

const ATTACHABLE_TYPES = {
    ammo: ["weapon"],
    equipment: ["weapon", "armor", "shield"],
    weapon: ["shield"],
} as const;

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

export function isSupressedFeat<TActor extends ActorPF2e | null>(item: ItemPF2e<TActor>): boolean {
    return item.isOfType("feat") && item.suppressed;
}

type AttachableType = keyof typeof ATTACHABLE_TYPES;
type AttachToType<T extends AttachableType> = (typeof ATTACHABLE_TYPES)[T][number];

type ActorItemInstances<TType extends ItemType, TActor extends ActorPF2e> = ItemInstances<TActor>[TType extends
    | "weapon"
    | "shield"
    ? TType | "weapon" | "equipment"
    : TType];
