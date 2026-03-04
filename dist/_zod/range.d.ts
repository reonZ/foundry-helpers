import z from "zod";
declare function zRange<T extends number>(min: number, max: number): z.ZodDefault<z.ZodCustom<T, T>>;
export { zRange };
