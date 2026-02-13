import z from "zod";
import { ClientDocumentInstance, ClientDocumentType, zDocumentID } from ".";
import { ClientDocument } from "..";
declare function zForeignDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(model: T, validator?: (value: ClientDocument) => boolean): z.ZodCodec<z.ZodNullable<zDocumentID>, z.ZodNullable<z.ZodCustom<D, D>>>;
export { zForeignDocument };
