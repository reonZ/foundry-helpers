import z from "zod";
declare function zSafeArray<T extends z.ZodTypeAny>(schema: T, unique?: boolean): z.ZodArray<T>;
export { zSafeArray };
