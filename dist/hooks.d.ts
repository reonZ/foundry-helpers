declare function registerUpstreamHook(event: string, listener: RegisterHookCallback, once?: boolean): number;
declare function createToggleHook(hook: string | string[], listener: RegisterHookCallback, options?: HookOptions): ToggleHook;
declare function executeWhenReady(fn: () => void): void;
type ToggleHook = {
    get enabled(): boolean;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
};
type RegisterHookCallback = (...args: any[]) => any;
type HookOptions = {
    onDisable?: () => void;
    onActivate?: () => void;
    upstream?: boolean;
};
export { createToggleHook, executeWhenReady, registerUpstreamHook };
export type { HookOptions, ToggleHook };
