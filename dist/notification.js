import { localize, R } from ".";
function notify(type, ...args) {
    const permanent = R.isBoolean(args.at(-1)) ? args.pop() : false;
    const str = localize(...args);
    return ui.notifications.notify(str, type, { permanent });
}
function success(...args) {
    return notify("success", ...args);
}
function info(...args) {
    return notify("info", ...args);
}
function warning(...args) {
    return notify("warning", ...args);
}
function error(...args) {
    return notify("error", ...args);
}
export { error, info, success, warning };
