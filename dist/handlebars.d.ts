import { HelperOptions } from "handlebars";
declare function render(...args: HandlebarsRenderArgs): Promise<string>;
declare function templateLocalize(...subKeys: string[]): (context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, options?: HelperOptions | undefined) => string;
type RenderData = {
    [k: string]: any;
    i18n: TemplateLocalize;
    isSF2e: boolean;
};
type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e"> & {
    i18n?: string;
};
type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
type TemplateLocalize = ReturnType<typeof templateLocalize>;
export { render, templateLocalize };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
