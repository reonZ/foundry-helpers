declare function activateHooksAndWrappers(entries: {
    activate: () => void;
}[]): void;
declare function disableHooksAndWrappers(entries: {
    disable: () => void;
}[]): void;
declare function toggleHooksAndWrappers(entries: {
    toggle: (enabled: boolean) => void;
}[], enabled: boolean): void;
declare function localeCompare(a: string, b: string): number;
declare function sortByLocaleCompare<T extends Record<string, any>>(list: Array<T>, key: keyof T): void;
declare function recordToSelectOptions(record: Record<string, string | undefined>): {
    value: string;
    label: string | undefined;
}[];
declare function getDragEventData<T extends Record<string, JSONValue>>(event: DragEvent): T;
declare function stringNumber(value: number | `${number}`): `${number}`;
declare function stringBoolean(value: boolean | `${boolean}`): `${boolean}`;
declare function valueBetween(value: number, min: number, max: number): boolean;
declare function createDuplicateMap<K extends string, T>(raw: [K[] | K, T][]): Map<K, T>;
export { activateHooksAndWrappers, createDuplicateMap, disableHooksAndWrappers, getDragEventData, localeCompare, recordToSelectOptions, sortByLocaleCompare, stringBoolean, stringNumber, toggleHooksAndWrappers, valueBetween, };
