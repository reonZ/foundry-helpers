import z from "zod";
function zClientDocument(model) {
    return z.custom((value) => {
        return value instanceof getDocumentClass(model);
    });
}
export { zClientDocument };
