import z from "zod";
import { R, valueBetween } from "..";
function zRange(min, max) {
    return z.custom((value) => R.isNumber(value) && valueBetween(value, min, max)).default(min);
}
export { zRange };
