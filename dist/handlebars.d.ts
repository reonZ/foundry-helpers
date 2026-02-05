import { Localize } from ".";
export declare function render(...args: HandlebarsRenderArgs): Promise<string>;
type RenderData = {
    [k: string]: any;
    i18n?: string | Localize;
    isSF2e: boolean;
    systemId: "pf2e" | "sf2e";
    systemPartial: (path: string) => string;
};
export type HandlebarsRenderData = Omit<RenderData, "isSF2e" | "systemId" | "systemPartial">;
export type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
export {};
