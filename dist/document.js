import { MODULE, R } from ".";
function getInMemory(obj, ...path) {
    return foundry.utils.getProperty(obj, `modules.${MODULE.id}.${path.join(".")}`);
}
function setInMemory(obj, ...args) {
    const value = args.pop();
    return foundry.utils.setProperty(obj, `modules.${MODULE.id}.${args.join(".")}`, value);
}
function deleteInMemory(obj, ...path) {
    return foundry.utils.deleteProperty(obj, `modules.${MODULE.id}.${path.join(".")}`);
}
/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/module/actor/item-transfer.ts#L117
 */
function getPreferredName(document) {
    if ("items" in document) {
        // Use a special moniker for party actors
        if (document.isOfType("party"))
            return game.i18n.localize("PF2E.loot.PartyStash");
        // Synthetic actor: use its token name or, failing that, actor name
        if (document.token)
            return document.token.name;
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
function isScriptMacro(doc) {
    return doc instanceof Macro && doc.type === "script";
}
// It also auto converts Token into TokenDocument directly in the provided obj
function isValidTargetDocuments(target) {
    if (!R.isPlainObject(target))
        return false;
    if (!(target.actor instanceof Actor))
        return false;
    target.token = target.token instanceof foundry.canvas.placeables.Token ? target.token.document : target.token;
    return !target.token || target.token instanceof TokenDocument;
}
export { deleteInMemory, getInMemory, getPreferredName, isScriptMacro, isValidTargetDocuments, setInMemory };
