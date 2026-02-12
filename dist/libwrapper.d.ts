import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
export declare function registerWrapper(type: libWrapper.RegisterType, path: string | string[], callback: libWrapper.RegisterCallback, context?: WrapperContext): number[];
export declare function unregisterWrapper(id: number | number[]): void;
export declare class ToggleableWrapper {
    #private;
    constructor(type: libWrapper.RegisterType, path: string | string[], callback: libWrapper.RegisterCallback, options?: WrapperOptions);
    get enabled(): boolean;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
}
export declare class ToggleableCreatureSheetWrapper extends ToggleableWrapper {
    constructor(type: libWrapper.RegisterType, partialPath: string | string[], callback: libWrapper.RegisterCallback, options?: WrapperOptions);
}
export declare class SharedWrappersContainer<TDocument extends ClientDocument, TWrapperCallback extends libWrapper.RegisterCallback, TListener extends (...args: any[]) => any> {
    #private;
    constructor(type: SharedType, path: string, sharedCallback: SharedCallback<TDocument, TWrapperCallback, TListener>);
    activate(): void;
    disable(): void;
    register(listener: (document: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>, options: {
        context: WrapperContext;
        priority?: number;
    }): ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener>;
    register(listener: (this: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>, options?: {
        context?: undefined;
        priority?: number;
    }): ToggleableSharedWrapper<TDocument, TWrapperCallback, TListener>;
}
declare class ToggleableSharedWrapper<TDocument extends ClientDocument, TWrapperCallback extends libWrapper.RegisterCallback, TListener extends (...args: any[]) => any> {
    #private;
    constructor(parent: SharedWrappersContainer<TDocument, TWrapperCallback, TListener>, listener: libWrapper.RegisterCallback, context: WrapperContext | undefined, priority: number);
    get parent(): SharedWrappersContainer<TDocument, TWrapperCallback, TListener>;
    get active(): boolean;
    get context(): any;
    get listener(): libWrapper.RegisterCallback;
    get priority(): number;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
}
type WrapperOptions = {
    context?: WrapperContext;
    onDisable?: () => void;
    onActivate?: () => void;
};
type SharedType = Exclude<libWrapper.RegisterType, "OVERRIDE">;
type SharedCallback<TDocument extends ClientDocument = ClientDocument, TWrapperCallback extends libWrapper.RegisterCallback = libWrapper.RegisterCallback, TListener extends (...args: any[]) => any = (...args: any[]) => any> = (this: TDocument, registered: TListener[], wrapped: () => ReturnType<TWrapperCallback>, args: Parameters<TWrapperCallback>) => void;
type WrapperContext = InstanceType<new (...args: any[]) => any>;
export type { ToggleableSharedWrapper };
