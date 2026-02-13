import { ChatMessagePF2e } from "pf2e-types";
import { ClientDocument } from ".";
export declare function createChatLink(docOrUuid: (ClientDocument & {
    name: string;
}) | string, options?: {
    label?: string;
    html: true;
}): Promise<string>;
export declare function createChatLink(docOrUuid: (ClientDocument & {
    name: string;
}) | string, options: {
    label?: string;
    html?: false;
}): string;
export declare function isActionMessage(message: ChatMessagePF2e): boolean;
export declare function isSpellMessage(message: ChatMessagePF2e): boolean;
