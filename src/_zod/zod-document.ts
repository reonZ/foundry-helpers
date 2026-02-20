import z from "zod";
import { R } from "..";

class ZodDocument<T extends z.ZodObject = z.ZodObject> {
    #data: z.output<T>;

    constructor(data: z.output<T>) {
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

    toObject(): z.output<T> {
        return foundry.utils.deepClone(this.#data);
    }

    encode<TEncoder extends T>(encoder: TEncoder): z.input<T> | undefined {
        return encoder.safeEncode(this.#data)?.data;
    }
}

class ZodDocumentArray<T extends z.ZodObject, M extends ZodDocument<T>> extends Array<M> {
    constructor(sources: z.input<T>[], decoder: T, Model: ConstructorOf<M>) {
        const entries = R.pipe(
            sources,
            R.map((source) => {
                const data = decoder.safeDecode(source);
                return data ? new Model(data) : undefined;
            }),
            R.filter(R.isTruthy),
        );

        super(...entries);
    }

    toObject(): z.output<T>[] {
        return this.map((entry) => entry.toObject());
    }

    encode<TEncoder extends T>(encoder: TEncoder): z.input<T>[] {
        return this.map((entry) => entry.encode(encoder)).filter(R.isTruthy);
    }
}

export { ZodDocument, ZodDocumentArray };
