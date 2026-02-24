import z from "zod";
import { zClientDocument, zDocumentId, zDocumentUUID, } from ".";
import { R } from "..";
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
function zForeignDocumentUUID(options) {
    const { embedded, type } = R.isObjectType(options) ? options : { embedded: undefined, type: options };
    const ModelClass = getDocumentClass(type);
    return z.codec(zDocumentUUID({ embedded, type }).nullable(), zClientDocument(type).nullable(), {
        decode: async (uuid) => {
            const doc = R.isString(uuid) ? await fromUuid(uuid) : null;
            return doc instanceof ModelClass ? doc : null;
        },
        encode: (doc) => {
            return doc?.uuid ?? null;
        },
    });
}
function zForeignItem(type, embedded = false) {
    const ItemCls = getDocumentClass("Item");
    return z.codec(zDocumentUUID({ embedded, type: "Item" }).nullable(), zClientDocument("Item").nullable(), {
        decode: async (uuid) => {
            const item = R.isString(uuid) ? await fromUuid(uuid) : null;
            return item instanceof ItemCls && item.type === type ? item : null;
        },
        encode: (doc) => {
            return doc?.uuid ?? null;
        },
    });
}
export { zForeignDocument, zForeignDocumentUUID, zForeignItem };
