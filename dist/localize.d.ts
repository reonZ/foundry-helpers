import { HelperDelegate } from "handlebars";
declare class Localize extends Function {
    subkeys: string[];
    constructor(...subkeys: string[]);
    path(...path: string[]): string;
    getLocalizeData(...args: LocalizeArgs): {
        path: string;
        data?: LocalizeData;
    };
    localizeOrFormat(path: string, data?: LocalizeData): string;
    ifExist(...args: LocalizeArgs): string | undefined;
    notify(type: "info" | "warning" | "error" | "success", ...args: NotificationArgs): fa.ui.Notification;
    success(...args: NotificationArgs): fa.ui.Notification;
    info(...args: NotificationArgs): fa.ui.Notification;
    warning(...args: NotificationArgs): fa.ui.Notification;
    error(...args: NotificationArgs): fa.ui.Notification;
    sub(...subkeys: string[]): Localize;
    shared(key: CollapseOf<LEVIKTIMES>): string;
    i18n(...subkeys: string[]): TemplateLocalize;
}
declare function foundryLocalizeIfExist(key: string): string | undefined;
interface Localize {
    (...args: LocalizeArgs): string;
}
interface TemplateLocalize {
    (...args: TemplateLocalizeArgs): string;
    root(...args: TemplateLocalizeArgs): string;
    tooltip(...args: TemplateLocalizeArgs): string;
}
declare const localize: Localize;
type LocalizeData = Record<string, any>;
type LocalizeArgs = string[] | [...string[], string | LocalizeData];
type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
type TemplateLocalizeArgs = Parameters<HelperDelegate>;
export { localize, foundryLocalizeIfExist };
export type { Localize, LocalizeArgs, LocalizeData, NotificationArgs, TemplateLocalizeArgs, TemplateLocalize };
