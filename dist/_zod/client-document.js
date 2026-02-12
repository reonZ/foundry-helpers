import z from "zod";
export function zClientDocument(model) {
    return z.custom((value) => {
        return value instanceof getDocumentClass(model);
    });
}
