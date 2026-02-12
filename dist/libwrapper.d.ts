import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
declare function registerWrapper(type: libWrapper.RegisterType, path: string | string[], callback: libWrapper.RegisterCallback, context?: WrapperContext): number[];
declare function unregisterWrapper(id: number | number[]): void;
declare function createSharedWrapper<TDocument extends ClientDocument, TWrapperCallback extends libWrapper.RegisterCallback, TListener extends (...args: any[]) => any>(type: Exclude<libWrapper.RegisterType, "OVERRIDE">, path: string, sharedCallback: (this: TDocument, registered: TListener[], wrapped: () => ReturnType<TWrapperCallback>, args: Parameters<TWrapperCallback>) => void): {
    register: {
        (listener: (document: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>, options: {
            context: WrapperContext;
            priority?: number;
        }): ToggleWrapper;
        (listener: (this: TDocument, ...args: Parameters<TListener>) => ReturnType<TListener>, options?: {
            context?: undefined;
            priority?: number;
        }): ToggleWrapper;
    };
};
declare function createToggleWrapper(type: libWrapper.RegisterType, path: string | string[], callback: libWrapper.RegisterCallback, options?: WrapperOptions): ToggleWrapper;
declare function createCreatureSheetWrapper(type: libWrapper.RegisterType, partialPath: string | string[], callback: libWrapper.RegisterCallback, options?: WrapperOptions): ToggleWrapper;
type ToggleWrapper = {
    get enabled(): boolean;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
};
type WrapperOptions = {
    context?: WrapperContext;
    onDisable?: () => void;
    onActivate?: () => void;
};
type WrapperContext = InstanceType<new (...args: any[]) => any>;
export { createCreatureSheetWrapper, createSharedWrapper, createToggleWrapper, registerWrapper, unregisterWrapper };
export type { ToggleWrapper };
