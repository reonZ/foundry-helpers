export class CycleArray extends Array {
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
