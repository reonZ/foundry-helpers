import { localize, R } from ".";
class Notifications extends Function {
    constructor(...subkeys) {
        super();
        this.subkeys = subkeys;
        function notify(type, ...args) {
            const permanent = R.isBoolean(args.at(-1)) ? args.pop() : false;
            const str = localize(...subkeys, ...args);
            return ui.notifications.notify(str, type, { permanent });
        }
        Object.assign(notify, this);
        Object.setPrototypeOf(notify, Object.getPrototypeOf(this));
        return notify;
    }
    success(...args) {
        return this("success", ...args);
    }
    info(...args) {
        return this("info", ...args);
    }
    warning(...args) {
        return this("warning", ...args);
    }
    error(...args) {
        return this("error", ...args);
    }
    sub(...subkeys) {
        return new Notifications(...this.subkeys, ...subkeys);
    }
}
export const notify = new Notifications();
