import { HelperOptions } from "handlebars";
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
    i18n(...subkeys: string[]): (context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, options?: HelperOptions | undefined) => string;
}
interface Localize {
    (...args: LocalizeArgs): string;
}
declare const localize: Localize;
type LocalizeData = Record<string, any>;
type LocalizeArgs = string[] | [...string[], string | LocalizeData];
type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
export { localize };
export type { Localize, LocalizeArgs, LocalizeData, NotificationArgs };
