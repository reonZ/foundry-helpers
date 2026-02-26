import z from "zod";
declare function zDocumentId(strict: true): z.ZodReadonly<z.ZodString>;
declare function zDocumentId(strict?: boolean): z.ZodReadonly<z.ZodDefault<z.ZodString>>;
declare function zSpellcastingEntryId(): z.ZodReadonly<z.ZodString>;
type zDocumentID = z.ZodReadonly<z.ZodDefault<z.ZodString>>;
export { zDocumentId, zSpellcastingEntryId };
export type { zDocumentID };
