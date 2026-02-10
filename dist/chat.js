import { enrichHTML, R, SYSTEM } from ".";
export function createChatLink(docOrUuid, { label, html } = {}) {
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
export function isActionMessage(message) {
    const type = message.flags[SYSTEM.id].origin?.type;
    return R.isIncludedIn(type, ["feat", "action"]);
}
export function isSpellMessage(message) {
    return R.isString(message.flags[SYSTEM.id].casting?.id);
}
