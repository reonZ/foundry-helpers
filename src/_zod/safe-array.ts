import z from "zod";
import { R } from "..";

function zSafeArray<T extends z.ZodTypeAny>(schema: T, unique: boolean = false): z.ZodArray<T> {
    return z.custom<z.output<T>[]>((arr): z.output<T>[] => {
        const result: z.output<T>[] = [];

        if (!R.isArray(arr)) {
            return result;
        }

        for (const entry of arr) {
            const parsed = schema.safeParse(entry);

            if (parsed.success) {
                result.push(parsed.data);
            }
        }

        return unique ? R.unique(result) : result;
    }) as any;
}

export { zSafeArray };
