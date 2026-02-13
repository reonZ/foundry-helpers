import { ChatMessagePF2e } from "foundry-pf2e";
import { ClientDocument, enrichHTML, R, SYSTEM } from ".";

export function createChatLink(
    docOrUuid: (ClientDocument & { name: string }) | string,
    options?: { label?: string; html: true },
): Promise<string>;
export function createChatLink(
    docOrUuid: (ClientDocument & { name: string }) | string,
    options: { label?: string; html?: false },
): string;
export function createChatLink(
    docOrUuid: (ClientDocument & { name: string }) | string,
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

export function isActionMessage(message: ChatMessagePF2e): boolean {
    const type = message.flags[SYSTEM.id].origin?.type;
    return R.isIncludedIn(type, ["feat", "action"]);
}

export function isSpellMessage(message: ChatMessagePF2e): boolean {
    return R.isString(message.flags[SYSTEM.id].casting?.id);
}
