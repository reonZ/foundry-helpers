import z from "zod";
import {
    ClientDocumentInstance,
    ClientDocumentMapping,
    ClientDocumentType,
    zClientDocument,
    zDocumentID,
    zDocumentId,
    zDocumentUUID,
} from ".";
import { DocumentUUID, ItemUUID, R } from "..";
import { ActorPF2e, ItemInstances, ItemType } from "@7h3laughingman/pf2e-types";

function zForeignDocument<
    T extends ClientDocumentType,
    D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>,
>(
    model: T,
    validator: (value: ClientDocumentInstance<T>) => boolean = () => true,
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

function zForeignDocumentUUID<
    T extends ClientDocumentType,
    D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>,
>(
    options: { embedded?: boolean; type: T } | T,
): z.ZodCodec<z.ZodNullable<z.ZodCustom<DocumentUUID, DocumentUUID>>, z.ZodNullable<z.ZodCustom<D, D>>> {
    const { embedded, type } = R.isObjectType(options) ? options : { embedded: undefined, type: options };
    const ModelClass = getDocumentClass(type) as ClientDocumentMapping[T];

    return z.codec(zDocumentUUID({ embedded, type }).nullable(), zClientDocument<T, D>(type as any).nullable(), {
        decode: async (uuid): Promise<D | null> => {
            const doc = R.isString(uuid) ? await fromUuid(uuid) : null;
            return doc instanceof ModelClass ? (doc as D) : null;
        },
        encode: (doc) => {
            return doc?.uuid ?? null;
        },
    });
}

function zForeignItem<T extends ItemType, A extends ActorPF2e>(
    type: T,
    embedded: true,
): z.ZodCodec<
    z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>,
    z.ZodNullable<z.ZodCustom<ItemInstances<A>[T], ItemInstances<A>[T]>>
>;
function zForeignItem<T extends ItemType>(
    type: T,
    embedded?: boolean,
): z.ZodCodec<
    z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>,
    z.ZodNullable<z.ZodCustom<ItemInstances<null>[T], ItemInstances<null>[T]>>
>;
function zForeignItem<T extends ItemType>(type: T, embedded: boolean = false) {
    const ItemCls = getDocumentClass("Item");

    return z.codec(
        zDocumentUUID<ItemUUID>({ embedded, type: "Item" }).nullable(),
        zClientDocument(type as any).nullable(),
        {
            decode: async (uuid) => {
                const item = R.isString(uuid) ? await fromUuid(uuid) : null;
                return item instanceof ItemCls && item.type === type ? item : null;
            },
            encode: (doc) => {
                return doc?.uuid ?? null;
            },
        },
    );
}

export { zForeignItem, zForeignDocument, zForeignDocumentUUID };
