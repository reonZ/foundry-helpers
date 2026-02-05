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
    getLocalizeData(...args) {
        const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
        const path = MODULE.path(...this.subkeys, ...args);
        return { path, data };
    }
    i18n() {
        const self = this;
        function i18n(...args) {
            return self(...args);
        }
        Object.defineProperties(i18n, {
            tooltip: {
                value: (...args) => {
                    const path = args.slice(0, -1);
                    const tooltip = self(...path);
                    return `data-tooltip="${tooltip}"`;
                },
                enumerable: false,
                configurable: false,
            },
            root: {
                value: (...args) => {
                    const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
                    const path = MODULE.path(...args);
                    return self.localizeOrFormat(path, data);
                },
                enumerable: false,
                configurable: false,
            },
        });
        return i18n;
    }
    ifExist(...args) {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
    }
    sub(...subkeys) {
        return new Localize(...this.subkeys, ...subkeys);
    }
    localizeOrFormat(path, data) {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }
}
export const localize = new Localize();
