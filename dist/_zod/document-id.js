import z from "zod";
function zDocumentId(strict = false) {
    const core = z.string().trim().refine(foundry.data.validators.isValidId);
    return strict ? core.readonly() : core.default(foundry.utils.randomID).readonly();
}
function zSpellcastingEntryId() {
    return z
        .string()
        .trim()
        .refine((value) => {
        const id = value.endsWith("-casting") ? value.slice(0, -8) : value;
        return foundry.data.validators.isValidId(id);
    })
        .readonly();
}
export { zDocumentId, zSpellcastingEntryId };
