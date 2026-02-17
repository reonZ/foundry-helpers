import { R } from ".";
class CycleArray extends Array {
    #index = 0;
    get index() {
        if (this.#index > this.length - 1) {
            this.#index = this.length - 1;
        }
        return this.#index;
    }
    get current() {
        return this.at(this.index);
    }
    get isLast() {
        return this.index === this.length - 1;
    }
    get isFirst() {
        return this.index === 0;
    }
    setFromValue(value) {
        const index = this.indexOf(value);
        this.#index = index >= 0 ? index : this.#index;
    }
    increment() {
        this.#index = (this.index + 1) % this.length;
        return this.current;
    }
    decrement() {
        const modulo = this.length;
        const value = this.index - 1;
        this.#index = ((value % modulo) + modulo) % modulo;
        return this.current;
    }
    cycle(direction) {
        return Number(direction) > 0 ? this.increment() : this.decrement();
    }
}
function removeIndexFromArray(array, index, copy = true) {
    const usedArray = (copy ? array.slice() : array);
    if (index < 0 || index >= array.length) {
        return usedArray;
    }
    usedArray.splice(index, 1);
    return usedArray;
}
function arraysEqual(arr1, arr2) {
    arr1 = R.unique(arr1);
    arr2 = R.unique(arr2);
    return arr1.length === arr2.length && arr1.every((entry) => arr2.includes(entry));
}
function includesAny(arr, entries) {
    for (const entry of entries) {
        if (arr.includes(entry)) {
            return true;
        }
    }
    return false;
}
function includesAll(arr, entries) {
    for (const entry of entries) {
        if (!arr.includes(entry)) {
            return false;
        }
    }
    return true;
}
export { arraysEqual, CycleArray, includesAll, includesAny, removeIndexFromArray };
