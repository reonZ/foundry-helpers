import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
export declare function createChatLink(docOrUuid: ClientDocument | string, options?: {
    label?: string;
    html: true;
}): Promise<string>;
export declare function createChatLink(docOrUuid: ClientDocument | string, options: {
    label?: string;
    html?: false;
}): string;
