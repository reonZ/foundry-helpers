import { MODULE, R } from ".";
function foundryLocalizeIfExist(key) {
    if (game.i18n.has(key, true)) {
        return game.i18n.localize(key);
    }
}
function getLocalizeData(...args) {
    const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
    const path = localizePath(...args);
    return { path, data };
}
function localizeOrFormat(path, data) {
    return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
}
function localize(...args) {
    const { data, path } = getLocalizeData(...args);
    return localizeOrFormat(path, data);
}
function sharedLocalize(key) {
    return game.i18n.localize(`LEVIKTIMES.${key}`);
}
function localizeIfExist(...args) {
    const { data, path } = getLocalizeData(...args);
    if (game.i18n.has(path, true)) {
        return localizeOrFormat(path, data);
    }
}
function localizePath(...path) {
    return MODULE.path(...path);
}
export { foundryLocalizeIfExist, localize, localizeIfExist, localizePath, sharedLocalize };
