import { ActorPF2e, ItemInstances, ItemType } from "@7h3laughingman/pf2e-types";
import z from "zod";
import { ClientDocumentInstance, ClientDocumentType, zDocumentID } from ".";
import { DocumentUUID, ItemUUID } from "..";
declare function zForeignDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(model: T, validator?: (value: ClientDocumentInstance<T>) => boolean): z.ZodCodec<z.ZodNullable<zDocumentID>, z.ZodNullable<z.ZodCustom<D, D>>>;
declare function zForeignDocumentUUID<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(options: {
    embedded?: boolean;
    type: T;
} | T): z.ZodCodec<z.ZodNullable<z.ZodCustom<DocumentUUID, DocumentUUID>>, z.ZodNullable<z.ZodCustom<D, D>>>;
declare function zForeignItem<T extends ItemType, A extends ActorPF2e>(type: T, embedded: true): z.ZodCodec<z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>, z.ZodNullable<z.ZodCustom<ItemInstances<A>[T], ItemInstances<A>[T]>>>;
declare function zForeignItem<T extends ItemType>(type: T, embedded?: boolean): z.ZodCodec<z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>, z.ZodNullable<z.ZodCustom<ItemInstances<ActorPF2e | null>[T], ItemInstances<ActorPF2e | null>[T]>>>;
export { zForeignDocument, zForeignDocumentUUID, zForeignItem };
