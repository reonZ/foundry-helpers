import { htmlClosest, isInstanceOf, } from "..";
/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/module/actor/item-transfer.ts#L117
 */
function getPreferredName(document) {
    if ("items" in document) {
        // Use a special moniker for party actors
        if (document.isOfType("party"))
            return game.i18n.localize("PF2E.loot.PartyStash");
        // Synthetic actor: use its token name or, failing that, actor name
        if (document.token)
            return document.token.name;
        // Linked actor: use its token prototype name
        return document.prototypeToken?.name ?? document.name;
    }
    // User with an assigned character
    if (document.character) {
        const token = canvas.tokens.placeables.find((t) => t.actor?.id === document.id);
        return token?.name ?? document.character?.name;
    }
    // User with no assigned character (should never happen)
    return document.name;
}
/**
 * https://github.com/foundryvtt/pf2e/blob/f7d7441acbf856b490a4e0c0d799809cd6e3dc5d/src/scripts/helpers.ts#L16
 */
function resolveActorAndItemFromHTML(html) {
    const messageId = htmlClosest(html, "[data-message-id]")?.dataset.messageId;
    const message = messageId ? (game.messages.get(messageId) ?? null) : null;
    const sheetDocument = resolveSheetDocument(html);
    const sheetActor = isInstanceOf(sheetDocument, "ActorPF2e") ? sheetDocument : null;
    const sheetItem = isInstanceOf(sheetDocument, "ItemPF2e") ? sheetDocument : null;
    const item = (() => {
        if (isItemUUID(html.dataset.itemUuid)) {
            const document = fromUuidSync(html.dataset.itemUuid);
            if (isInstanceOf(document, "ItemPF2e"))
                return document;
        }
        if (sheetItem) {
            return sheetItem;
        }
        if (sheetActor) {
            const itemId = htmlClosest(html, "[data-item-id]")?.dataset.itemId;
            const document = itemId ? sheetActor.items.get(itemId) : null;
            if (document)
                return document;
        }
        return message?.item ?? null;
    })();
    return {
        sheetActor,
        actor: item?.actor ?? message?.actor ?? null,
        item,
        message,
        appDocument: message ?? sheetDocument,
    };
}
/**
 * https://github.com/foundryvtt/pf2e/blob/f7d7441acbf856b490a4e0c0d799809cd6e3dc5d/src/scripts/helpers.ts#L8
 */
function resolveSheetDocument(html) {
    const sheet = ui.windows[Number(html.closest(".app.sheet")?.dataset.appid)] ?? null;
    const doc = sheet?.document;
    return doc instanceof Actor || doc instanceof Item || doc instanceof JournalEntry ? doc : null;
}
function isItemUUID(uuid, options = {}) {
    if (typeof uuid !== "string")
        return false;
    try {
        const parseResult = foundry.utils.parseUuid(uuid);
        const isEmbedded = !!parseResult && parseResult.embedded.length > 0;
        return (parseResult?.type === "Item" &&
            (options.embedded === true ? isEmbedded : options.embedded === false ? !isEmbedded : true));
    }
    catch {
        return false;
    }
}
export { getPreferredName, resolveActorAndItemFromHTML };
