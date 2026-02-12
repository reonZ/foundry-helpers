import { HelperDelegate } from "handlebars";
import { MODULE, R } from ".";

class Localize extends Function {
    declare subkeys: string[];

    constructor(...subkeys: string[]) {
        super();

        this.subkeys = subkeys;

        const self = this;

        function localize(...args: LocalizeArgs): string {
            const { data, path } = self.getLocalizeData(...args);
            return self.localizeOrFormat(path, data);
        }

        Object.assign(localize, this);
        Object.setPrototypeOf(localize, Object.getPrototypeOf(this));

        return localize as Localize;
    }

    path(...path: string[]): string {
        return MODULE.path(...this.subkeys, ...path);
    }

    getLocalizeData(...args: LocalizeArgs): { path: string; data?: LocalizeData } {
        const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
        const path = this.path(...(args as string[]));
        return { path, data };
    }

    localizeOrFormat(path: string, data?: LocalizeData): string {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }

    ifExist(...args: LocalizeArgs): string | undefined {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
    }

    sub(...subkeys: string[]): Localize {
        return new Localize(...this.subkeys, ...subkeys);
    }

    shared(key: CollapseOf<LEVIKTIMES>): string {
        return game.i18n.localize(`LEVIKTIMES.${key}`);
    }

    i18n(...subkeys: string[]) {
        const self = this;

        function i18n(...args: LocalizeArgs): string {
            return self(...subkeys, ...args);
        }

        Object.defineProperties(i18n, {
            tooltip: {
                value: (...args: Parameters<HelperDelegate>): string => {
                    const path = args.slice(0, -1);
                    const tooltip = i18n(...subkeys, ...path);
                    return `data-tooltip="${tooltip}"`;
                },
                enumerable: false,
                configurable: false,
            },
            root: {
                value: (...args: Parameters<HelperDelegate>) => {
                    const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
                    const path = MODULE.path(...subkeys, ...(args as string[]));
                    return self.localizeOrFormat(path, data);
                },
                enumerable: false,
                configurable: false,
            },
        });

        return i18n;
    }
}

interface Localize {
    (...args: LocalizeArgs): string;
}

const localize = new Localize();

type LocalizeData = Record<string, any>;

type LocalizeArgs = string[] | [...string[], string | LocalizeData];

export { localize };
export type { Localize, LocalizeArgs, LocalizeData };
