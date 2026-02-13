import { ActorPF2e, MacroPF2e, UserPF2e } from "pf2e-types";
import { ClientDocument, MODULE, R, Token } from ".";

function getInMemory<T>(obj: ClientDocument | Token, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(obj, `modules.${MODULE.id}.${path.join(".")}`) as T | undefined;
}

function setInMemory<T>(obj: ClientDocument | Token, ...args: [...string[], T]): boolean {
    const value = args.pop();
    return foundry.utils.setProperty(obj, `modules.${MODULE.id}.${args.join(".")}`, value);
}

function deleteInMemory(obj: ClientDocument | Token, ...path: string[]) {
    return foundry.utils.deleteProperty(obj, `modules.${MODULE.id}.${path.join(".")}`);
}

/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/module/actor/item-transfer.ts#L117
 */
function getPreferredName(document: ActorPF2e | UserPF2e) {
    if ("items" in document) {
        // Use a special moniker for party actors
        if (document.isOfType("party")) return game.i18n.localize("PF2E.loot.PartyStash");
        // Synthetic actor: use its token name or, failing that, actor name
        if (document.token) return document.token.name;

        // Linked actor: use its token prototype name
        return document.prototypeToken?.name ?? document.name;
    }
    // User with an assigned character
    if (document.character) {
        const token = canvas.tokens.placeables.find((t) => t.actor?.id === document.id);
        return token?.name ?? document.character?.name;
    }

    // User with no assigned character (should never happen)
    return document.name;
}

function isScriptMacro(doc: any): doc is MacroPF2e {
    return doc instanceof Macro && doc.type === "script";
}

// It also auto converts Token into TokenDocument directly in the provided obj
function isValidTargetDocuments(target: unknown): target is TargetDocuments {
    if (!R.isPlainObject(target)) return false;
    if (!(target.actor instanceof Actor)) return false;

    target.token = target.token instanceof foundry.canvas.placeables.Token ? target.token.document : target.token;
    return !target.token || target.token instanceof TokenDocument;
}

export { deleteInMemory, getInMemory, getPreferredName, isScriptMacro, isValidTargetDocuments, setInMemory };
