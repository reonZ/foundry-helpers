import { Notification } from "foundry-pf2e/foundry/client/applications/ui/notifications.mjs";
import { localize, LocalizeArgs, LocalizeData, R } from ".";

class Notifications extends Function {
    constructor() {
        super();

        function notify(type: NotificationType, ...args: NotificationArgs): Notification {
            const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
            const str = localize(...(args as LocalizeArgs));
            return ui.notifications.notify(str, type, { permanent });
        }

        Object.assign(notify, this);
        Object.setPrototypeOf(notify, Object.getPrototypeOf(this));

        return notify as any;
    }

    success(...args: NotificationArgs): Notification {
        return this("success", ...args);
    }

    info(...args: NotificationArgs): Notification {
        return this("info", ...args);
    }

    warning(...args: NotificationArgs): Notification {
        return this("warning", ...args);
    }

    error(...args: NotificationArgs): Notification {
        return this("error", ...args);
    }
}
interface Notifications {
    (type: NotificationType, ...args: NotificationArgs): Notification;
}

type NotificationType = "info" | "warning" | "error" | "success";

export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];

export const notify = new Notifications();
