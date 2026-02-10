export declare class CycleArray<T> extends Array<T> {
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
export declare function includesAny(arr: any[], entries: any[]): boolean;
