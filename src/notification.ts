import { localize, LocalizeArgs, LocalizeData, R } from ".";

function notify(type: "info" | "warning" | "error" | "success", ...args: NotificationArgs): fa.ui.Notification {
    const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
    const str = localize(...(args as LocalizeArgs));
    return ui.notifications.notify(str, type, { permanent });
}

function success(...args: NotificationArgs): fa.ui.Notification {
    return notify("success", ...args);
}

function info(...args: NotificationArgs): fa.ui.Notification {
    return notify("info", ...args);
}

function warning(...args: NotificationArgs): fa.ui.Notification {
    return notify("warning", ...args);
}

function error(...args: NotificationArgs): fa.ui.Notification {
    return notify("error", ...args);
}

type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];

export { error, info, success, warning };

export type { NotificationArgs };
