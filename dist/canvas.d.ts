import { PingOptions } from ".";
/**
 * slightly modified core foundry version
 */
declare function ping(origin: Point, options?: PingOptions & {
    delay?: number;
    instances?: number;
    local?: boolean;
    pull?: boolean;
    style?: ValueOf<typeof CONFIG.Canvas.pings.types>;
    user?: User;
}): Promise<boolean>;
declare function canPing(user?: User): boolean;
declare function pan(point: Point, options?: {
    ping?: boolean;
    user?: User;
}): Promise<void>;
export { canPing, pan, ping };
