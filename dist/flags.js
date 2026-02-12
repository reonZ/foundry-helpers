import { MODULE } from ".";
function getFlag(doc, ...path) {
    return doc.getFlag(MODULE.id, path.join("."));
}
function setFlag(doc, ...args) {
    const value = args.pop();
    return doc.setFlag(MODULE.id, args.join("."), value);
}
function unsetFlag(doc, ...path) {
    return doc.unsetFlag(MODULE.id, path.join("."));
}
function flagPath(...path) {
    return `flags.${MODULE.path(...path)}`;
}
function unsetFlagPath(...path) {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}
function getFlagProperty(obj, ...path) {
    return foundry.utils.getProperty(obj, flagPath(...path));
}
function setFlagProperty(obj, ...args) {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), value);
    return obj;
}
function setFlagProperties(obj, ...args) {
    const properties = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), properties);
    return obj;
}
function unsetFlagProperty(obj, ...path) {
    foundry.utils.setProperty(obj, unsetFlagPath(...path), null);
    return obj;
}
function deleteFlagProperty(obj, ...path) {
    foundry.utils.deleteProperty(obj, flagPath(...path));
    return obj;
}
export { deleteFlagProperty, getFlag, getFlagProperty, setFlag, setFlagProperties, setFlagProperty, unsetFlag, unsetFlagProperty, };
