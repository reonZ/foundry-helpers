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
    ifExist(...args) {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
    }
    sub(...subkeys) {
        return new Localize(...this.subkeys, ...subkeys);
    }
    root(...args) {
        const data = R.isObjectType(args.at(-1)) ? args.pop() : undefined;
        const path = MODULE.path(...args);
        return this.localizeOrFormat(path, data);
    }
    tooltip(...args) {
        const tooltip = args.slice(0, -1);
        return `data-tooltip="${tooltip}"`;
    }
    localizeOrFormat(path, data) {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }
}
export const localize = new Localize();
