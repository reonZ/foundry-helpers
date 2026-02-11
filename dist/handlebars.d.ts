import { LocalizeArgs } from ".";
export declare function render(...args: HandlebarsRenderArgs): Promise<string>;
type RenderData = {
    [k: string]: any;
    i18n: (...args: LocalizeArgs) => string;
    isSF2e: boolean;
};
export type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e" | "systemId" | "systemPartial"> & {
    i18n?: string;
};
export type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
export {};
