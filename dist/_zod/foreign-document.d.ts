import z from "zod";
import { ClientDocumentInstance, ClientDocumentType, zDocumentID } from ".";
import { ClientDocument, DocumentUUID } from "..";
declare function zForeignDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(model: T, validator?: (value: ClientDocument) => boolean): z.ZodCodec<z.ZodNullable<zDocumentID>, z.ZodNullable<z.ZodCustom<D, D>>>;
declare function zForeignDocumentUUID<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(options: {
    embedded?: boolean;
    type: T;
} | T): z.ZodCodec<z.ZodNullable<z.ZodCustom<DocumentUUID, DocumentUUID>>, z.ZodNullable<z.ZodCustom<D, D>>>;
export { zForeignDocument, zForeignDocumentUUID };
