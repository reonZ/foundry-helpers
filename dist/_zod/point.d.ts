import z from "zod";
declare function zPoint({ x, y }?: Partial<Point>): z.ZodDefault<z.ZodObject<{
    x: z.ZodCatch<z.ZodNumber>;
    y: z.ZodCatch<z.ZodNumber>;
}, z.core.$strip>>;
export { zPoint };
