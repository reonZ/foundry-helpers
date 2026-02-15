import { ChatMessagePF2e } from "@7h3laughingman/pf2e-types";
import { ClientDocument } from ".";
declare function latestChatMessages(nb: number, fromMessage?: ChatMessagePF2e): Generator<ChatMessagePF2e, void, undefined>;
declare function refreshLatestMessages(nb: number): Promise<void>;
declare function createChatLink(docOrUuid: (ClientDocument & {
    name: string;
}) | string, options?: {
    label?: string;
    html: true;
}): Promise<string>;
declare function createChatLink(docOrUuid: (ClientDocument & {
    name: string;
}) | string, options: {
    label?: string;
    html?: false;
}): string;
declare function isActionMessage(message: ChatMessagePF2e): boolean;
declare function isSpellMessage(message: ChatMessagePF2e): boolean;
export { createChatLink, isActionMessage, isSpellMessage, latestChatMessages, refreshLatestMessages };
