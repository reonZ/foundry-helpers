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

    getLocalizeData(...args: LocalizeArgs): { path: string; data?: LocalizeData } {
        const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
        const path = MODULE.path(...this.subkeys, ...(args as string[]));
        return { path, data };
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

    root(...args: LocalizeArgs): string {
        const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
        const path = MODULE.path(...(args as string[]));
        return this.localizeOrFormat(path, data);
    }

    tooltip(...args: Parameters<HelperDelegate>) {
        const tooltip = args.slice(0, -1);
        return `data-tooltip="${tooltip}"`;
    }

    localizeOrFormat(path: string, data?: LocalizeData): string {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }
}

interface Localize {
    (...args: LocalizeArgs): string;
}

export const localize = new Localize();

export type LocalizeData = Record<string, any>;
export type LocalizeArgs = string[] | [...string[], string | LocalizeData];
export type { Localize };
