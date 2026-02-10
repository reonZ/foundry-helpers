import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
import { ChatMessagePF2e } from "foundry-pf2e";
export declare function createChatLink(docOrUuid: ClientDocument | string, options?: {
    label?: string;
    html: true;
}): Promise<string>;
export declare function createChatLink(docOrUuid: ClientDocument | string, options: {
    label?: string;
    html?: false;
}): string;
export declare function isActionMessage(message: ChatMessagePF2e): boolean;
export declare function isSpellMessage(message: ChatMessagePF2e): boolean;
