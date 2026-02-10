export function activateHooksAndWrappers(entries) {
    for (const entry of entries) {
        entry.activate();
    }
}
export function disableHooksAndWrappers(entries) {
    for (const entry of entries) {
        entry.disable();
    }
}
export function toggleHooksAndWrappers(entries, enabled) {
    for (const entry of entries) {
        entry.toggle(enabled);
    }
}
export function localeCompare(a, b) {
    return a.localeCompare(b, game.i18n.lang);
}
export function sortByLocaleCompare(list, key) {
    list.sort((a, b) => localeCompare(a[key], b[key]));
}
