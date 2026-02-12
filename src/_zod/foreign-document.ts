import z from "zod";
import {
    ClientDocumentInstance,
    ClientDocumentMapping,
    ClientDocumentType,
    zClientDocument,
    zDocumentID,
    zDocumentId,
} from ".";

export function zForeignDocument<
    T extends ClientDocumentType,
    D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>,
>(
    model: T,
    validator: (value: ClientDocument) => boolean = () => true,
): z.ZodCodec<z.ZodNullable<zDocumentID>, z.ZodNullable<z.ZodCustom<D, D>>> {
    const ModelClass = getDocumentClass(model) as ClientDocumentMapping[T];

    return z.codec(zDocumentId().nullable(), zClientDocument<T, D>(model).nullable(), {
        decode: (id): D | null => {
            const doc = (id ? ModelClass.get(id) : null) as D | null;
            return doc && validator(doc) ? doc : null;
        },
        encode: (doc): string | null => {
            return doc instanceof ModelClass ? doc.id : null;
        },
    });
}
