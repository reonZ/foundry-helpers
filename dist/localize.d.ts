declare class Localize extends Function {
    subkeys: string[];
    constructor(...subkeys: string[]);
    getLocalizeData(...args: LocalizeArgs): {
        path: string;
        data?: LocalizeData;
    };
    i18n(): (...args: LocalizeArgs) => string;
    ifExist(...args: LocalizeArgs): string | undefined;
    sub(...subkeys: string[]): Localize;
    localizeOrFormat(path: string, data?: LocalizeData): string;
}
interface Localize {
    (...args: LocalizeArgs): string;
}
export declare const localize: Localize;
export type LocalizeData = Record<string, any>;
export type LocalizeArgs = string[] | [...string[], string | LocalizeData];
export type { Localize };
