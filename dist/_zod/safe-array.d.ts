import z from "zod";
declare function zSafeArray<T extends z.ZodTypeAny>(schema: T, unique?: boolean): z.ZodPipe<z.ZodTransform<z.core.output<T>[], unknown>, z.ZodArray<T>>;
export { zSafeArray };
