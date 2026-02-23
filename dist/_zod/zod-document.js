import { R } from "..";
class ZodDocument {
    #data;
    constructor(data) {
        this.#data = data;
        for (const property in this.#data) {
            Object.defineProperty(this, property, {
                get() {
                    return this.#data[property];
                },
                set(value) {
                    this.#data[property] = value;
                },
            });
        }
    }
    toObject() {
        return foundry.utils.deepClone(this.#data);
    }
    encode(encoder) {
        return encoder.safeEncode(this.#data).data;
    }
}
class ZodDocumentArray extends Array {
    constructor(sources, decoder, Model) {
        const entries = R.pipe(sources, R.map((source) => {
            const data = decoder.safeDecode(source);
            return data ? new Model(data) : undefined;
        }), R.filter(R.isTruthy));
        super(...entries);
    }
    toObject() {
        return this.map((entry) => entry.toObject());
    }
    encode(encoder) {
        return this.map((entry) => entry.encode(encoder)).filter(R.isTruthy);
    }
}
export { ZodDocument, ZodDocumentArray };
