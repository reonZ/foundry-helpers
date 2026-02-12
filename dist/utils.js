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
export { activateHooksAndWrappers, disableHooksAndWrappers, localeCompare, sortByLocaleCompare, toggleHooksAndWrappers, };
