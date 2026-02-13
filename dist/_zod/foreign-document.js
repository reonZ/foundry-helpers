import z from "zod";
import { zClientDocument, zDocumentId, } from ".";
function zForeignDocument(model, validator = () => true) {
    const ModelClass = getDocumentClass(model);
    return z.codec(zDocumentId().nullable(), zClientDocument(model).nullable(), {
        decode: (id) => {
            const doc = (id ? ModelClass.get(id) : null);
            return doc && validator(doc) ? doc : null;
        },
        encode: (doc) => {
            return doc instanceof ModelClass ? doc.id : null;
        },
    });
}
export { zForeignDocument };
