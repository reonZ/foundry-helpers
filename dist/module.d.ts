import { ImageFilePath, Module } from ".";
declare class CustomModule {
    #private;
    get id(): string;
    get current(): Module;
    get name(): string;
    get isDebug(): boolean;
    register(id: string, globalName?: string): void;
    group(label: string): void;
    groupEnd(): void;
    log(...args: any[]): void;
    debug(...args: any[]): void;
    globalPath(...path: string[]): string;
    path(...path: string[]): string;
    relativePath(...path: string[]): string;
    imagePath(...path: string[]): ImageFilePath;
    templatePath(...path: string[]): `${string}.hbs`;
    Error(str: string): Error;
    error(str: string, error?: Error): void;
    apiExpose(key: string, toExpose: Record<string, any> | Function): void;
    debugExpose(key: string, toExpose: any): void;
}
declare function getActiveModule(key: string): ActiveModule | undefined;
declare const MODULE: CustomModule;
type ExtendedModule<TModule extends Module = Module> = TModule & {
    getSetting<T = boolean>(key: string): T;
    setSetting<T>(key: string, value: T): Promise<T>;
};
type ActiveModule = Module & {
    getSetting<T = boolean>(...path: string[]): T;
};
export { getActiveModule, MODULE };
export type { ExtendedModule };
