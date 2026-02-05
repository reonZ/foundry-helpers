export declare class CycleArray<T> extends Array<T> {
    #private;
    get index(): number;
    get current(): T;
    increment(): T;
    decrement(): T;
    cycle(direction: number | boolean): T;
}
