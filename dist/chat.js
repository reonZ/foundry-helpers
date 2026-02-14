import { enrichHTML, R, SYSTEM } from ".";
function* latestChatMessages(nb, fromMessage) {
    if (!ui.chat)
        return;
    const messages = game.messages.contents;
    const startMessageIndex = fromMessage
        ? messages.findLastIndex((message) => message === fromMessage)
        : messages.length;
    const startIndex = startMessageIndex - 1;
    for (let i = startIndex; i >= startIndex - nb; i--) {
        const message = messages[i];
        if (message) {
            yield message;
        }
    }
}
async function refreshLatestMessages(nb) {
    const chat = ui.chat?.element;
    if (!chat)
        return;
    const messages = game.messages.contents;
    const startIndex = messages.length - 1;
    for (let i = startIndex; i >= startIndex - nb; i--) {
        const message = messages[i];
        if (message) {
            ui.chat.updateMessage(message, { notify: false });
        }
    }
}
function createChatLink(docOrUuid, { label, html } = {}) {
    const isDocument = docOrUuid instanceof foundry.abstract.Document;
    if (!label && isDocument) {
        label = docOrUuid.name ?? undefined;
    }
    let link = `@UUID[${isDocument ? docOrUuid.uuid : docOrUuid}]`;
    if (label) {
        link = `${link}{${label}}`;
    }
    return html ? enrichHTML(link) : link;
}
function isActionMessage(message) {
    const type = message.flags[SYSTEM.id].origin?.type;
    return R.isIncludedIn(type, ["feat", "action"]);
}
function isSpellMessage(message) {
    return R.isString(message.flags[SYSTEM.id].casting?.id);
}
export { createChatLink, isActionMessage, isSpellMessage, latestChatMessages, refreshLatestMessages };
