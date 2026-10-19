import { PingOptions } from ".";
/**
 * slightly modified core foundry version
 */
declare function ping(origin: Point, options?: PingOptions & {
    local?: boolean;
}): Promise<boolean>;
declare function canPing(user?: User): boolean;
declare function pan(point: Point, options?: {
    ping?: boolean;
}): Promise<void>;
export { canPing, pan, ping };
