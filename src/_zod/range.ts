import z from "zod";
import { R, valueBetween } from "..";

function zRange<T extends number>(min: number, max: number): z.ZodDefault<z.ZodCustom<T, T>> {
    return z.custom((value) => R.isNumber(value) && valueBetween(value, min, max)).default(min) as z.ZodDefault<
        z.ZodCustom<T, T>
    >;
}

export { zRange };
