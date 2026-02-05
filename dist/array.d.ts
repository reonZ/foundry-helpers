export declare class CycleArray<T> extends Array<T> {
    #private;
    get index(): number;
    get current(): T;
    setFromValue(value: T): void;
    increment(): T;
    decrement(): T;
    cycle(direction: number | boolean): T;
}
