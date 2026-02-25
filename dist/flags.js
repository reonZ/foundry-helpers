import { MODULE, R } from ".";
function flagPath(...path) {
    return `flags.${MODULE.path(...path)}`;
}
function unsetFlagPath(...path) {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}
function getFlag(doc, ...path) {
    return doc.getFlag(MODULE.id, R.join(path, "."));
}
function setFlag(doc, ...args) {
    const value = args.pop();
    return doc.setFlag(MODULE.id, R.join(args, "."), value);
}
function unsetFlag(doc, ...path) {
    return doc.unsetFlag(MODULE.id, R.join(path, "."));
}
function updateFlag(doc, updates, operation) {
    return doc.update({ flags: { [MODULE.id]: updates } }, operation);
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
function updateSourceFlag(doc, ...args) {
    const value = args.pop();
    return doc.updateSource({ [flagPath(...args)]: value });
}
export { deleteFlagProperty, getFlag, getFlagProperty, setFlag, setFlagProperties, setFlagProperty, unsetFlag, unsetFlagProperty, updateFlag, updateSourceFlag, };
