import { ChatMessagePF2e, DamageRoll } from "@7h3laughingman/pf2e-types";
import {
    CAST_A_SPELL_OPTION,
    ClientDocument,
    enrichHTML,
    R,
    reverseIncludes,
    Rolled,
    SYSTEM,
    USE_ACTION_OPTION,
} from ".";

function* latestChatMessages(nb: number, fromMessage?: ChatMessagePF2e): Generator<ChatMessagePF2e, void, undefined> {
    if (!ui.chat) return;

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

async function refreshLatestMessages(nb: number) {
    const chat = ui.chat?.element;
    if (!chat) return;

    const messages = game.messages.contents;
    const startIndex = messages.length - 1;

    for (let i = startIndex; i >= startIndex - nb; i--) {
        const message = messages[i];
        if (message) {
            ui.chat.updateMessage(message, { notify: false });
        }
    }
}

function createChatLink(
    docOrUuid: (ClientDocument & { name: string }) | string,
    options?: { label?: string; html: true },
): Promise<string>;
function createChatLink(
    docOrUuid: (ClientDocument & { name: string }) | string,
    options: { label?: string; html?: false },
): string;
function createChatLink(
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

function messageHasCastSpellOption(message: ChatMessagePF2e): boolean {
    return reverseIncludes(message.flags[SYSTEM.id].origin?.rollOptions, CAST_A_SPELL_OPTION);
}

function messageHasUseActionOption(message: ChatMessagePF2e): boolean {
    return reverseIncludes(message.flags[SYSTEM.id].origin?.rollOptions, USE_ACTION_OPTION);
}

function isActionMessage(message: ChatMessagePF2e): boolean {
    const { origin, context } = message.flags[SYSTEM.id];
    return R.isIncludedIn(origin?.type, ["feat", "action"]) && !message.isCheckRoll && context?.type !== "damage-taken";
}

function isSpellMessage(message: ChatMessagePF2e): boolean {
    return R.isString(message.flags[SYSTEM.id].casting?.id);
}

type DamageMessage = ChatMessagePF2e & {
    rolls: Rolled<DamageRoll>[];
};

export {
    createChatLink,
    isActionMessage,
    isSpellMessage,
    latestChatMessages,
    messageHasCastSpellOption,
    messageHasUseActionOption,
    refreshLatestMessages,
};
export type { DamageMessage };
