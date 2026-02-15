import { ActorPF2e, ItemPF2e, TokenDocumentPF2e } from "pf2e-types";
import z from "zod";

function zClientDocument<T extends ClientDocumentType, D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>>(
    model: T,
): z.ZodCustom<D, D> {
    return z.custom((value) => {
        return value instanceof getDocumentClass(model);
    });
}

type ClientDocumentMapping = {
    Actor: typeof ActorPF2e;
    Item: typeof ItemPF2e;
    Token: typeof TokenDocumentPF2e;
};

type ClientDocumentType = keyof ClientDocumentMapping;
type ClientDocumentInstance<T extends ClientDocumentType> = InstanceType<ClientDocumentMapping[T]>;

export { zClientDocument };
export type { ClientDocumentInstance, ClientDocumentMapping, ClientDocumentType };
