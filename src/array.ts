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

function includesAny(arr: any[], entries: any[]): boolean {
    for (const entry of entries) {
        if (arr.includes(entry)) {
            return true;
        }
    }

    return false;
}

export { CycleArray, includesAny };
