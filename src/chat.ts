import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
import { enrichHTML } from ".";

export function createChatLink(
    docOrUuid: ClientDocument | string,
    options?: { label?: string; html: true },
): Promise<string>;
export function createChatLink(docOrUuid: ClientDocument | string, options: { label?: string; html?: false }): string;
export function createChatLink(
    docOrUuid: ClientDocument | string,
    { label, html }: { label?: string; html?: boolean } = {},
) {
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
