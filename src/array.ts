import { R } from ".";

class CycleArray<T> extends Array<T> {
    #index = 0;

    get index(): number {
        if (this.#index > this.length - 1) {
            this.#index = this.length - 1;
        }
        return this.#index;
    }

    get current(): T {
        return this.at(this.index) as T;
    }

    get isLast() {
        return this.index === this.length - 1;
    }

    get isFirst() {
        return this.index === 0;
    }

    setFromValue(value: T) {
        const index = this.indexOf(value);
        this.#index = index >= 0 ? index : this.#index;
    }

    increment(): T {
        this.#index = (this.index + 1) % this.length;
        return this.current;
    }

    decrement(): T {
        const modulo = this.length;
        const value = this.index - 1;

        this.#index = ((value % modulo) + modulo) % modulo;
        return this.current;
    }

    cycle(direction: number | boolean): T {
        return Number(direction) > 0 ? this.increment() : this.decrement();
    }
}

function removeIndexFromArray<T extends any[]>(array: T, index: number, copy = true): T {
    const usedArray = (copy ? array.slice() : array) as T;

    if (index < 0 || index >= array.length) {
        return usedArray;
    }

    usedArray.splice(index, 1);
    return usedArray;
}

function arraysEqual<T extends any[]>(arr1: T, arr2: any[]): arr2 is T {
    arr1 = R.unique(arr1) as unknown as T;
    arr2 = R.unique(arr2);
    return arr1.length === arr2.length && arr1.every((entry) => arr2.includes(entry));
}

function includesAny(arr: any[], entries: any[]): boolean {
    for (const entry of entries) {
        if (arr.includes(entry)) {
            return true;
        }
    }

    return false;
}

function includesAll(arr: any[], entries: any[]): boolean {
    for (const entry of entries) {
        if (!arr.includes(entry)) {
            return false;
        }
    }

    return true;
}

export { arraysEqual, CycleArray, includesAll, includesAny, removeIndexFromArray };
