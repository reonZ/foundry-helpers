import { R } from ".";
const ATTACHABLE_TYPES = {
    ammo: ["weapon"],
    equipment: ["weapon", "armor", "shield"],
    weapon: ["shield"],
};
function* actorItems(actor, type) {
    const types = R.isArray(type) ? type : type ? [type] : R.keys(CONFIG.PF2E.Item.documentClasses);
    // we must add parent types for subitems lookup
    const attachables = type && types.filter((t) => t in ATTACHABLE_TYPES);
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
            yield item;
            // we also yield subitems because they are unnaccessible otherwise
            if ("subitems" in item) {
                for (const subitem of item.subitems) {
                    yield subitem;
                }
            }
        }
    }
}
export function findItemWithSourceId(actor, uuid, type) {
    for (const item of actorItems(actor, type)) {
        if (isSupressedFeat(item))
            continue;
        const sourceId = getItemSourceId(item);
        if (sourceId === uuid) {
            return item;
        }
    }
    return null;
}
export function getItemSourceId(item) {
    const isCompendiumItem = item._id && item.pack && !item.isEmbedded;
    return isCompendiumItem ? item.uuid : (item._stats.compendiumSource ?? item._stats.duplicateSource ?? item.uuid);
}
export function isSupressedFeat(item) {
    return item.isOfType("feat") && item.suppressed;
}
