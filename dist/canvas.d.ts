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
declare function createPickPositionHandler(notify: string, callback: (point: Point) => void): PickPositionHandler;
type PickPositionHandler = {
    clear: () => void;
    activate: (notify?: string) => void;
};
export { canPing, createPickPositionHandler, pan, ping };
