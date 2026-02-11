import { Notification } from "foundry-pf2e/foundry/client/applications/ui/notifications.mjs";
import { localize, LocalizeArgs, LocalizeData, R } from ".";

class Notifications extends Function {
    #subkeys: string[];

    constructor(...subkeys: string[]) {
        super();

        this.#subkeys = subkeys;

        function notify(this: Notifications, type: NotificationType, ...args: NotificationArgs): Notification {
            const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
            const str = localize(...subkeys, ...(args as LocalizeArgs));
            return ui.notifications.notify(str, type, { permanent });
        }

        Object.assign(notify, this);
        Object.setPrototypeOf(notify, Object.getPrototypeOf(this));

        return notify.bind(this) as Notifications;
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

    sub(...subkeys: string[]): Notifications {
        return new Notifications(...this.#subkeys, ...subkeys);
    }
}
interface Notifications {
    (type: NotificationType, ...args: NotificationArgs): Notification;
}

type NotificationType = "info" | "warning" | "error" | "success";

export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];

export const notify = new Notifications();
export type { Notifications };
