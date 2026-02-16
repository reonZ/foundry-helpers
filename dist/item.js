import { createHTMLElementContent, getDamageRollClass, htmlQuery, includesAny, R, setHasElement, SYSTEM, } from ".";
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
]);
const ATTACHABLE_TYPES = {
    ammo: ["weapon"],
    equipment: ["weapon", "armor", "shield"],
    weapon: ["shield"],
};
function itemIsOfType(item, ...types) {
    return (typeof item.name === "string" &&
        types.some((t) => (t === "physical" ? setHasElement(PHYSICAL_ITEM_TYPES, item.type) : item.type === t)));
}
function getItemSource(item, clearId) {
    const source = item.toObject();
    source._stats.compendiumSource ??= item.uuid;
    if (clearId) {
        // @ts-expect-error
        delete source._id;
    }
    return source;
}
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
function findItemWithSourceId(actor, uuid, type) {
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
function findItemWithSlug(actor, slug, type) {
    for (const item of actorItems(actor, type)) {
        if (isSupressedFeat(item))
            continue;
        const itemSlug = getItemSlug(item);
        if (itemSlug === slug) {
            return item;
        }
    }
    return null;
}
function getItemSourceId(item) {
    const isCompendiumItem = item._id && item.pack && !item.isEmbedded;
    return isCompendiumItem ? item.uuid : (item._stats.compendiumSource ?? item._stats.duplicateSource ?? item.uuid);
}
function getItemSlug(item) {
    return item instanceof Item ? item.slug || SYSTEM.sluggify(item._source.name) : SYSTEM.sluggify(item.name);
}
async function usePhysicalItem(event, item) {
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
                const msg = game.toolbelt.localize("actionable.item.cancel", item);
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
async function consumeItem(event, item) {
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
    }
    else {
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
        }
        else {
            await item.update({
                "system.quantity": newQuantity,
                "system.uses.value": uses.max,
            });
        }
    }
    else {
        await item.update({
            "system.uses.value": Math.max(uses.value - 1, 0),
        });
    }
}
function isSupressedFeat(item) {
    return item.isOfType("feat") && item.suppressed;
}
function isCastConsumable(item) {
    return R.isIncludedIn(item.category, ["wand", "scroll"]) && !!item.system.spell;
}
function isSF2eItem(item) {
    return includesAny(item._source.system.traits.value, ["tech", "analog"]);
}
function isAreaOrAutoFireType(type) {
    return R.isIncludedIn(type, ["area-fire", "auto-fire"]);
}
export { consumeItem, findItemWithSlug, findItemWithSourceId, getItemSlug, getItemSource, getItemSourceId, isAreaOrAutoFireType, isCastConsumable, isSF2eItem, isSupressedFeat, itemIsOfType, usePhysicalItem, };
