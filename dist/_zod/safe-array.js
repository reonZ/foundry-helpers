import z from "zod";
import { R } from "..";
function zSafeArray(schema, unique = false) {
    return z.preprocess((arr) => {
        const result = [];
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
    }, z.array(schema));
}
export { zSafeArray };
