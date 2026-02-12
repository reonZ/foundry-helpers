import { LocalizeArgs, LocalizeData } from ".";
declare function success(...args: NotificationArgs): fa.ui.Notification;
declare function info(...args: NotificationArgs): fa.ui.Notification;
declare function warning(...args: NotificationArgs): fa.ui.Notification;
declare function error(...args: NotificationArgs): fa.ui.Notification;
type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
export { error, info, success, warning };
export type { NotificationArgs };
