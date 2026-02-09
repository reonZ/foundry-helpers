import { Module } from "foundry-pf2e/foundry/client/packages/_module.mjs";
import { LocalizeArgs } from ".";
export declare class MODULE {
    #private;
    constructor(id: string, globalName?: string);
    static register(id: string, globalName?: string): void;
    static get id(): string;
    static get current(): Module;
    static get name(): string;
    static path(...path: string[]): string;
    static relativePath(...path: string[]): string;
    static imagePath(...path: string[]): string;
    static templatePath(...path: string[]): string;
    static Error(error: string): Error;
    static error(...args: [...string[], string | Error]): void;
    static apiExpose(path: string, object: Record<string, Function>, context?: any): void;
    get api(): Record<string, Function>;
    get id(): string;
    get active(): boolean;
    getSetting(...path: string[]): unknown;
    localize(...args: LocalizeArgs): string;
}
