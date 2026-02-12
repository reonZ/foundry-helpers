import { HelperDelegate, HelperOptions } from "handlebars";
import { localize, LocalizeData, MODULE, R, SYSTEM } from ".";

function render(...args: HandlebarsRenderArgs): Promise<string> {
    const data = args.at(-1) as unknown as RenderData;
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);

    data.i18n = templateLocalize(R.isString(data.i18n) ? data.i18n : template.replace(/\//, "."));
    data.isSF2e = SYSTEM.isSF2e;

    return foundry.applications.handlebars.renderTemplate(path, data);
}

function templateLocalize(...subKeys: string[]) {
    const fn = (...args: Parameters<HelperDelegate>) => {
        const { hash } = args.pop() as HelperOptions;
        return localize(...subKeys, ...(args as string[]), hash as LocalizeData);
    };

    Object.defineProperties(fn, {
        tooltip: {
            value: (...args: Parameters<HelperDelegate>) => {
                const { hash } = args.pop() as HelperOptions;
                return templateTooltip(...subKeys, ...(args as string[]), hash);
            },
            enumerable: false,
            configurable: false,
        },
        root: {
            value: (...args: Parameters<HelperDelegate>) => {
                const { hash } = args.pop() as HelperOptions;
                return localize(...(args as string[]), hash as LocalizeData);
            },
            enumerable: false,
            configurable: false,
        },
    });

    return fn;
}

function templateTooltip(...args: [...string[], TemplateToolipOptions]): string {
    const options = args[0] as TemplateToolipOptions;
    const tooltip = options.localize !== false ? localize(...args) : args[0];
    return `data-tooltip="${tooltip}"`;
    // return `data-tooltip="${tooltip}" aria-label="${tooltip}"`;
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

type TemplateLocalize = ReturnType<typeof templateLocalize>;

type TemplateToolipOptions = LocalizeData & { localize?: boolean };

export { render, templateLocalize };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
