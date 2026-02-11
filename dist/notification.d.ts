import { Notification } from "foundry-pf2e/foundry/client/applications/ui/notifications.mjs";
import { LocalizeArgs, LocalizeData } from ".";
declare class Notifications extends Function {
    #private;
    constructor(...subkeys: string[]);
    success(...args: NotificationArgs): Notification;
    info(...args: NotificationArgs): Notification;
    warning(...args: NotificationArgs): Notification;
    error(...args: NotificationArgs): Notification;
    sub(...subkeys: string[]): Notifications;
}
interface Notifications {
    (type: NotificationType, ...args: NotificationArgs): Notification;
}
type NotificationType = "info" | "warning" | "error" | "success";
export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
export declare const notify: Notifications;
export type { Notifications };
