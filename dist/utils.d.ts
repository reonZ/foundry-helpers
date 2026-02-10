export declare function activateHooksAndWrappers(entries: {
    activate: () => void;
}[]): void;
export declare function disableHooksAndWrappers(entries: {
    disable: () => void;
}[]): void;
export declare function toggleHooksAndWrappers(entries: {
    toggle: (enabled: boolean) => void;
}[], enabled: boolean): void;
export declare function localeCompare(a: string, b: string): number;
export declare function sortByLocaleCompare<T extends Record<string, any>>(list: Array<T>, key: keyof T): void;
