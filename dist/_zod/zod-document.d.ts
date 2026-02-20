import z from "zod";
declare class ZodDocument<T extends z.ZodObject = z.ZodObject> {
    #private;
    constructor(data: z.output<T>);
    toObject(): z.output<T>;
    encode<TEncoder extends T>(encoder: TEncoder): z.input<T> | undefined;
}
declare class ZodDocumentArray<T extends z.ZodObject, M extends ZodDocument<T>> extends Array<M> {
    constructor(sources: z.input<T>[], decoder: T, Model: ConstructorOf<M>);
    toObject(): z.output<T>[];
    encode<TEncoder extends T>(encoder: TEncoder): z.input<T>[];
}
export { ZodDocument, ZodDocumentArray };
