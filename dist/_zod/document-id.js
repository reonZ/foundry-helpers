import z from "zod";
function zDocumentId() {
    return z.string().trim().refine(foundry.data.validators.isValidId).default(foundry.utils.randomID).readonly();
}
export { zDocumentId };
