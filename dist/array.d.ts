declare class CycleArray<T> extends Array<T> {
    #private;
    get index(): number;
    get current(): T;
    get isLast(): boolean;
    get isFirst(): boolean;
    setFromValue(value: T): void;
    increment(): T;
    decrement(): T;
    cycle(direction: number | boolean): T;
}
declare function arraysEqual<T extends any[]>(arr1: T, arr2: any[]): arr2 is T;
declare function includesAny(arr: any[], entries: any[]): boolean;
export { arraysEqual, CycleArray, includesAny };
