function activateHooksAndWrappers(entries: { activate: () => void }[]) {
    for (const entry of entries) {
        entry.activate();
    }
}

function disableHooksAndWrappers(entries: { disable: () => void }[]) {
    for (const entry of entries) {
        entry.disable();
    }
}

function toggleHooksAndWrappers(entries: { toggle: (enabled: boolean) => void }[], enabled: boolean) {
    for (const entry of entries) {
        entry.toggle(enabled);
    }
}

function localeCompare(a: string, b: string) {
    return a.localeCompare(b, game.i18n.lang);
}

function sortByLocaleCompare<T extends Record<string, any>>(list: Array<T>, key: keyof T) {
    list.sort((a, b) => localeCompare(a[key], b[key]));
}

export {
    activateHooksAndWrappers,
    disableHooksAndWrappers,
    localeCompare,
    sortByLocaleCompare,
    toggleHooksAndWrappers,
};
