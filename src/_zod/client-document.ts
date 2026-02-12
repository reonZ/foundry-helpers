import { ActorPF2e, ItemPF2e } from "foundry-pf2e";
import z from "zod";

export function zClientDocument<
    T extends ClientDocumentType,
    D extends ClientDocumentInstance<T> = ClientDocumentInstance<T>,
>(model: T): z.ZodCustom<D, D> {
    return z.custom((value) => {
        return value instanceof getDocumentClass(model);
    });
}

export type ClientDocumentMapping = {
    Actor: typeof ActorPF2e;
    Item: typeof ItemPF2e;
};

export type ClientDocumentType = keyof ClientDocumentMapping;
export type ClientDocumentInstance<T extends ClientDocumentType> = InstanceType<ClientDocumentMapping[T]>;
