import { localize, LocalizeArgs, MODULE, R, SYSTEM } from ".";

export function render(...args: HandlebarsRenderArgs): Promise<string> {
    const data = args.at(-1) as unknown as RenderData;
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);

    data.isSF2e = SYSTEM.isSF2e;
    data.systemId = SYSTEM.id;
    data.systemPartial = (path: string) => SYSTEM.relativePath("templates", path);
    data.i18n = localize.sub(R.isString(data.i18n) ? data.i18n : template.replace(/\//, ".")).i18n();

    return foundry.applications.handlebars.renderTemplate(path, data);
}

type RenderData = {
    [k: string]: any;
    i18n: (...args: LocalizeArgs) => string;
    isSF2e: boolean;
    systemId: "pf2e" | "sf2e";
    systemPartial: (path: string) => string;
};

export type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e" | "systemId" | "systemPartial"> & {
    i18n?: string;
};
export type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
