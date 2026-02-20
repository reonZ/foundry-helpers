import { MODULE, R } from ".";
async function getDocumentFromUUID(type, uuid) {
    if (!uuid)
        return null;
    const DocumentCls = getDocumentClass(type);
    const doc = await fromUuid(uuid);
    return doc instanceof DocumentCls ? doc : null;
}
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
function isDocumentUUID(type, uuid) {
    return foundry.utils.parseUuid(uuid)?.type === type;
}
export { deleteInMemory, getDocumentFromUUID, getInMemory, isDocumentUUID, isScriptMacro, isValidTargetDocuments, setInMemory, };
