import { PingOptions } from ".";
/**
 * slightly modified core foundry version
 */
declare function ping(origin: Point, options?: PingOptions & {
    local?: boolean;
}): Promise<boolean>;
export { ping };
