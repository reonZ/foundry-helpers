import { ActorPF2e, ItemInstances, ItemType, PhysicalItemPF2e } from "@7h3laughingman/pf2e-types";
import z from "zod";
import { ClientDocumentInstance, ClientDocumentType, zDocumentID } from ".";
import { DocumentUUID, ItemUUID } from "..";
declare function zForeignDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(model: T, validator?: (value: ClientDocumentInstance<T>) => boolean): z.ZodCodec<z.ZodNullable<zDocumentID>, z.ZodNullable<z.ZodCustom<D, D>>>;
declare function zForeignDocumentUUID<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(options: {
    embedded?: boolean;
    type: T;
} | T): z.ZodCodec<z.ZodNullable<z.ZodCustom<DocumentUUID, DocumentUUID>>, z.ZodNullable<z.ZodCustom<D, D>>>;
declare function zForeignItem<A extends ActorPF2e | null>(type: "physical", embedded?: boolean): z.ZodCodec<z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>, z.ZodNullable<z.ZodCustom<PhysicalItemPF2e<A>, PhysicalItemPF2e<A>>>>;
declare function zForeignItem<T extends ItemType | "physical", A extends ActorPF2e | null>(type: T | T[], embedded?: boolean): z.ZodCodec<z.ZodNullable<z.ZodCustom<ItemUUID, ItemUUID>>, z.ZodNullable<z.ZodCustom<T extends "physical" ? PhysicalItemPF2e<A> : T extends ItemType ? ItemInstances<A>[T] : never, T extends "physical" ? PhysicalItemPF2e<A> : T extends ItemType ? ItemInstances<A>[T] : never>>>;
export { zForeignDocument, zForeignDocumentUUID, zForeignItem };
