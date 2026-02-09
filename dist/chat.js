import { enrichHTML } from ".";
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
