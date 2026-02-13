import { MODULE, R } from ".";
class Localize extends Function {
    constructor(...subkeys) {
        super();
        this.subkeys = subkeys;
        const self = this;
        function localize(...args) {
            const { data, path } = self.getLocalizeData(...args);
            return self.localizeOrFormat(path, data);
        }
        Object.assign(localize, this);
        Object.setPrototypeOf(localize, Object.getPrototypeOf(this));
        return localize;
    }
    path(...path) {
        return MODULE.path(...this.subkeys, ...path);
    }
    getLocalizeData(...args) {
        const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
        const path = this.path(...args);
        return { path, data };
    }
    localizeOrFormat(path, data) {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }
    ifExist(...args) {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
    }
    notify(type, ...args) {
        const permanent = R.isBoolean(args.at(-1)) ? args.pop() : false;
        const str = this(...args);
        return ui.notifications.notify(str, type, { permanent });
    }
    success(...args) {
        return this.notify("success", ...args);
    }
    info(...args) {
        return this.notify("info", ...args);
    }
    warning(...args) {
        return this.notify("warning", ...args);
    }
    error(...args) {
        return this.notify("error", ...args);
    }
    sub(...subkeys) {
        return new Localize(...this.subkeys, ...subkeys);
    }
    shared(key) {
        return game.i18n.localize(`LEVIKTIMES.${key}`);
    }
    i18n(...subkeys) {
        const self = this;
        const getTemplateData = (...args) => {
            const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
            const path = this.path(...subkeys, ...args);
            return { path, data: data?.hash };
        };
        function i18n(...args) {
            const { path, data } = getTemplateData(...args);
            return self.localizeOrFormat(path, data);
        }
        Object.defineProperties(i18n, {
            tooltip: {
                value: (...args) => {
                    const tooltip = i18n(...args);
                    return `data-tooltip="${tooltip}"`;
                },
                enumerable: false,
                configurable: false,
            },
            root: {
                value: (...args) => {
                    const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
                    const path = MODULE.path(...args);
                    return self.localizeOrFormat(path, data?.hash);
                },
                enumerable: false,
                configurable: false,
            },
        });
        return i18n;
    }
}
const localize = new Localize();
export { localize };
