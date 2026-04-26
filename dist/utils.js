import { R } from ".";
function activateHooksAndWrappers(entries) {
    for (const entry of entries) {
        entry.activate();
    }
}
function disableHooksAndWrappers(entries) {
    for (const entry of entries) {
        entry.disable();
    }
}
function toggleHooksAndWrappers(entries, enabled) {
    for (const entry of entries) {
        entry.toggle(enabled);
    }
}
function localeCompare(a, b) {
    return a.localeCompare(b, game.i18n.lang);
}
function sortByLocaleCompare(list, key) {
    list.sort((a, b) => localeCompare(a[key], b[key]));
}
function recordToSelectOptions(record) {
    return R.pipe(record, R.entries(), R.map(([value, label]) => {
        return { value, label };
    }));
}
function getDragEventData(event) {
    return foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
}
function stringNumber(value) {
    return String(value);
}
function stringBoolean(value) {
    return String(value);
}
function valueBetween(value, min, max) {
    return value >= min && value <= max;
}
function createDuplicateMap(raw) {
    const duplicated = raw.flatMap(([_keys, entry]) => {
        const keys = R.isArray(_keys) ? _keys : [_keys];
        return keys.map((key) => [key, entry]);
    });
    return new Map(duplicated);
}
export { activateHooksAndWrappers, createDuplicateMap, disableHooksAndWrappers, getDragEventData, localeCompare, recordToSelectOptions, sortByLocaleCompare, stringBoolean, stringNumber, toggleHooksAndWrappers, valueBetween, };
