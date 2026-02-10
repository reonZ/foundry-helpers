import { MODULE } from ".";
export function getFlag(doc, ...path) {
    return doc.getFlag(MODULE.id, path.join("."));
}
export function setFlag(doc, ...args) {
    const value = args.pop();
    return doc.setFlag(MODULE.id, args.join("."), value);
}
export function unsetFlag(doc, ...path) {
    return doc.unsetFlag(MODULE.id, path.join("."));
}
