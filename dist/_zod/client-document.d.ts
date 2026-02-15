import { ActorPF2e, ItemPF2e, TokenDocumentPF2e } from "@7h3laughingman/pf2e-types";
import z from "zod";
declare function zClientDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(model: T): z.ZodCustom<D, D>;
type ClientDocumentMapping = {
    Actor: typeof ActorPF2e;
    Item: typeof ItemPF2e;
    Token: typeof TokenDocumentPF2e;
};
type ClientDocumentType = keyof ClientDocumentMapping;
type ClientDocumentInstance<T extends ClientDocumentType> = InstanceType<ClientDocumentMapping[T]>;
export { zClientDocument };
export type { ClientDocumentInstance, ClientDocumentMapping, ClientDocumentType };
