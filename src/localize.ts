import { HelperDelegate, HelperOptions } from "handlebars";
import { MODULE, R } from ".";

class Localize extends Function {
    declare subkeys: string[];

    constructor(...subkeys: string[]) {
        super();

        this.subkeys = subkeys;

        const self = this;

        function localize(...args: LocalizeArgs): string {
            const { data, path } = self.getLocalizeData(...args);
            return self.localizeOrFormat(path, data);
        }

        Object.assign(localize, this);
        Object.setPrototypeOf(localize, Object.getPrototypeOf(this));

        return localize as Localize;
    }

    path(...path: string[]): string {
        return MODULE.path(...this.subkeys, ...path);
    }

    getLocalizeData(...args: LocalizeArgs): { path: string; data?: LocalizeData } {
        const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
        const path = this.path(...(args as string[]));
        return { path, data };
    }

    localizeOrFormat(path: string, data?: LocalizeData): string {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }

    ifExist(...args: LocalizeArgs): string | undefined {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
    }

    notify(type: "info" | "warning" | "error" | "success", ...args: NotificationArgs): fa.ui.Notification {
        const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
        const str = this(...(args as LocalizeArgs));
        return ui.notifications.notify(str, type, { permanent });
    }

    success(...args: NotificationArgs): fa.ui.Notification {
        return this.notify("success", ...args);
    }

    info(...args: NotificationArgs): fa.ui.Notification {
        return this.notify("info", ...args);
    }

    warning(...args: NotificationArgs): fa.ui.Notification {
        return this.notify("warning", ...args);
    }

    error(...args: NotificationArgs): fa.ui.Notification {
        return this.notify("error", ...args);
    }

    sub(...subkeys: string[]): Localize {
        return new Localize(...this.subkeys, ...subkeys);
    }

    shared(key: CollapseOf<LEVIKTIMES>): string {
        return game.i18n.localize(`LEVIKTIMES.${key}`);
    }

    i18n(...subkeys: string[]): TemplateLocalize {
        const self = this;

        const getTemplateData = (...args: TemplateLocalizeArgs): { path: string; data?: LocalizeData } => {
            const data = R.isObjectType(args.at(-1)) ? (args.pop() as HelperOptions) : undefined;
            const path = this.path(...subkeys, ...(args as string[]));
            return { path, data: data?.hash };
        };

        function i18n(...args: TemplateLocalizeArgs): string {
            const { path, data } = getTemplateData(...args);
            return self.localizeOrFormat(path, data);
        }

        Object.defineProperties(i18n, {
            tooltip: {
                value: (...args: TemplateLocalizeArgs): string => {
                    const tooltip = i18n(...args);
                    return `data-tooltip="${tooltip}"`;
                },
                enumerable: false,
                configurable: false,
            },
            root: {
                value: (...args: TemplateLocalizeArgs) => {
                    const data = R.isObjectType(args.at(-1)) ? (args.pop() as HelperOptions) : undefined;
                    const path = MODULE.path(...(args as string[]));
                    return self.localizeOrFormat(path, data?.hash);
                },
                enumerable: false,
                configurable: false,
            },
        });

        return i18n as TemplateLocalize;
    }
}

function foundryLocalizeIfExist(key: string): string | undefined {
    if (game.i18n.has(key, true)) {
        return game.i18n.localize(key);
    }
}

interface Localize {
    (...args: LocalizeArgs): string;
}

interface TemplateLocalize {
    (...args: TemplateLocalizeArgs): string;
    root(...args: TemplateLocalizeArgs): string;
    tooltip(...args: TemplateLocalizeArgs): string;
}

const localize = new Localize();

type LocalizeData = Record<string, any>;

type LocalizeArgs = string[] | [...string[], string | LocalizeData];

type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];

type TemplateLocalizeArgs = Parameters<HelperDelegate>;

export { localize, foundryLocalizeIfExist };
export type { Localize, LocalizeArgs, LocalizeData, NotificationArgs, TemplateLocalizeArgs, TemplateLocalize };
