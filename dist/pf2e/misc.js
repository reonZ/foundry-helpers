/**
 * https://github.com/foundryvtt/pf2e/blob/78e7f116221c6138e4f3d7e03177bd85936c6939/src/util/misc.ts#L216
 */
export function ErrorPF2e(message) {
    return Error(`PF2e System | ${message}`);
}
/**
 * https://github.com/foundryvtt/pf2e/blob/07c666035850e084835e0c8c3ca365b06dcd0a75/src/util/misc.ts#L48
 */
export function objectHasKey(obj, key) {
    return (typeof key === "string" || typeof key === "number") && key in obj;
}
/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/util/misc.ts#L58
 */
export function setHasElement(set, value) {
    return set.has(value);
}
