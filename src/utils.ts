import { R } from ".";

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

function recordToSelectOptions(
    record: Record<string, string | undefined>,
): { value: string; label: string | undefined }[] {
    return R.pipe(
        record,
        R.entries(),
        R.map(([value, label]) => {
            return { value, label };
        }),
    );
}

function getDragEventData<T extends Record<string, JSONValue>>(event: DragEvent): T {
    return foundry.applications.ux.TextEditor.implementation.getDragEventData(event) as T;
}

function stringNumber(value: number | `${number}`): `${number}` {
    return String(value) as `${number}`;
}

function stringBoolean(value: boolean | `${boolean}`): `${boolean}` {
    return String(value) as `${boolean}`;
}

function valueBetween(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

function createDuplicateMap<K extends string, T>(raw: [K[] | K, T][]): Map<K, T> {
    const duplicated = raw.flatMap(([_keys, entry]) => {
        const keys = R.isArray(_keys) ? _keys : [_keys];
        return keys.map((key) => [key, entry] as const);
    });
    return new Map(duplicated);
}

export {
    activateHooksAndWrappers,
    createDuplicateMap,
    disableHooksAndWrappers,
    getDragEventData,
    localeCompare,
    recordToSelectOptions,
    sortByLocaleCompare,
    stringBoolean,
    stringNumber,
    toggleHooksAndWrappers,
    valueBetween,
};
