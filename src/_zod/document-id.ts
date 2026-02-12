import z from "zod";

export function zDocumentId(): z.ZodReadonly<z.ZodDefault<z.ZodString>> {
    return z.string().trim().refine(foundry.data.validators.isValidId).default(foundry.utils.randomID).readonly();
}

export type zDocumentID = z.ZodReadonly<z.ZodDefault<z.ZodString>>;
