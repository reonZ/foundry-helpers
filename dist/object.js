import { R } from ".";
export class MapOfArrays extends Map {
    constructor(entries) {
        if (entries && !(Symbol.iterator in entries)) {
            super(Object.entries(entries));
        }
        else {
            super(entries);
        }
    }
    add(key, entry, create = true) {
        const entries = R.isArray(entry) ? entry : [entry];
        const arr = this.get(key, create);
        arr?.push(...entries);
    }
    get(key, create = false) {
        const exist = super.get(key);
        if (exist || !create) {
            return exist;
        }
        else {
            const arr = [];
            this.set(key, arr);
            return arr;
        }
    }
    remove(key, entry) {
        const arr = this.get(key);
        return arr?.findSplice((x) => x === entry) ?? null;
    }
    removeBy(key, fn) {
        const arr = this.get(key);
        return arr?.findSplice(fn) ?? null;
    }
    map(fn) {
        let index = 0;
        const transformed = [];
        for (const [key, value] of this.entries()) {
            transformed.push(fn(value, key, index, this));
            index++;
        }
        return transformed;
    }
    toObject() {
        return Object.fromEntries(this);
    }
    toJSON() {
        return this.toObject();
    }
}
export function isInstanceOf(obj, cls) {
    if (typeof obj !== "object" || obj === null)
        return false;
    let cursor = Reflect.getPrototypeOf(obj);
    while (cursor) {
        if (cursor.constructor.name === cls)
            return true;
        cursor = Reflect.getPrototypeOf(cursor);
    }
    return false;
}
