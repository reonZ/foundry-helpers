import { htmlClosest, isInstanceOf } from "..";
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
export { resolveActorAndItemFromHTML };
