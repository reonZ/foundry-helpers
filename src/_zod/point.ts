import z from "zod";

function zPoint({ x = 0, y = 0 }: Partial<Point> = {}) {
    return z
        .object({
            x: z.number().catch(x),
            y: z.number().catch(y),
        })
        .default({ x, y });
}

export { zPoint };
