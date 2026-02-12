import z from "zod";
export function zDocumentId() {
    return z.string().trim().refine(foundry.data.validators.isValidId).default(foundry.utils.randomID).readonly();
}
