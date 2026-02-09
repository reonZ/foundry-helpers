/**
 * https://github.com/foundryvtt/pf2e/blob/78e7f116221c6138e4f3d7e03177bd85936c6939/src/util/misc.ts#L216
 */
export declare function ErrorPF2e(message: string): Error;
/**
 * https://github.com/foundryvtt/pf2e/blob/07c666035850e084835e0c8c3ca365b06dcd0a75/src/util/misc.ts#L48
 */
export declare function objectHasKey<O extends object>(obj: O, key: unknown): key is keyof O;
/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/util/misc.ts#L58
 */
export declare function setHasElement<T extends Set<unknown>>(set: T, value: unknown): value is SetElement<T>;
