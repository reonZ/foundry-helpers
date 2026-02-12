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
export { activateHooksAndWrappers, disableHooksAndWrappers, localeCompare, sortByLocaleCompare, toggleHooksAndWrappers, };
