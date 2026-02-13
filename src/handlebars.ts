import { localize, MODULE, R, SYSTEM, TemplateLocalize } from ".";

function render(...args: HandlebarsRenderArgs): Promise<string> {
    const data = args.at(-1) as unknown as RenderData;
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);

    data.i18n = localize.i18n(R.isString(data.i18n) ? data.i18n : template.replace(/\//, "."));
    data.isSF2e = SYSTEM.isSF2e;

    return foundry.applications.handlebars.renderTemplate(path, data);
}

type RenderData = {
    [k: string]: any;
    i18n: TemplateLocalize;
    isSF2e: boolean;
};

type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e"> & {
    i18n?: string;
};

type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];

export { render };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
