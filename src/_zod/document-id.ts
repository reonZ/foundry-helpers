import z from "zod";

function zDocumentId(strict: true): z.ZodReadonly<z.ZodString>;
function zDocumentId(strict?: boolean): z.ZodReadonly<z.ZodDefault<z.ZodString>>;
function zDocumentId(strict = false): z.ZodReadonly<z.ZodString> | z.ZodReadonly<z.ZodDefault<z.ZodString>> {
    const core = z.string().trim().refine(foundry.data.validators.isValidId);
    return strict ? core.readonly() : core.default(foundry.utils.randomID).readonly();
}

function zSpellcastingEntryId(): z.ZodReadonly<z.ZodString> {
    return z
        .string()
        .trim()
        .refine((value) => {
            const id = value.endsWith("-casting") ? value.slice(0, -8) : value;
            return foundry.data.validators.isValidId(id);
        })
        .readonly();
}

type zDocumentID = z.ZodReadonly<z.ZodDefault<z.ZodString>>;

export { zDocumentId, zSpellcastingEntryId };
export type { zDocumentID };
