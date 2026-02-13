import { HelperDelegate } from "handlebars";
declare function render(...args: HandlebarsRenderArgs): Promise<string>;
type RenderData = {
    [k: string]: any;
    i18n: (...args: Parameters<HelperDelegate>) => string;
    isSF2e: boolean;
};
type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e"> & {
    i18n?: string;
};
type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
export { render };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
