import { Module } from "foundry-pf2e/foundry/client/packages/_module.mjs";
declare const MODULE: {
    readonly id: string;
    readonly name: string;
    readonly current: Module;
    readonly isDebug: boolean;
    path(...path: string[]): string;
    relativePath(...path: string[]): string;
    imagePath(...path: string[]): string;
    templatePath(...path: string[]): string;
    Error(str: string): Error;
    error(str: string, error?: Error): void;
    apiExpose(path: string, toExpose: Record<string, any>): void;
    debugExpose(path: string, toExpose: any): void;
    register(id: string, globalName?: string): void;
};
type ExtendedModule<TModule extends Module = Module> = TModule & {
    getSetting<T = boolean>(key: string): T;
    setSetting<T>(key: string, value: T): Promise<T>;
};
export { MODULE };
export type { ExtendedModule };
