export declare function registerUpstreamHook(event: string, listener: RegisterHookCallback, once?: boolean): number;
export declare function createToggleableHook(hook: string | string[], listener: RegisterHookCallback, options?: HookOptions): ToogleableHook;
export declare function executeWhenReady(fn: () => void): void;
export type ToogleableHook = {
    get enabled(): boolean;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
};
export type RegisterHookCallback = (...args: any[]) => any;
export type HookOptions = {
    onDisable?: () => void;
    onActivate?: () => void;
    upstream?: boolean;
};
