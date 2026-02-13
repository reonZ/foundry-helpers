import z from "zod";

function zDocumentId(): z.ZodReadonly<z.ZodDefault<z.ZodString>> {
    return z.string().trim().refine(foundry.data.validators.isValidId).default(foundry.utils.randomID).readonly();
}

type zDocumentID = z.ZodReadonly<z.ZodDefault<z.ZodString>>;

export { zDocumentId };
export type { zDocumentID };
