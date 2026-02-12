declare function foundryLocalizeIfExist(key: string): string | undefined;
declare function localize(...args: LocalizeArgs): string;
declare function sharedLocalize(key: CollapseOf<LEVIKTIMES>): string;
declare function localizeIfExist(...args: LocalizeArgs): string | undefined;
declare function localizePath(...path: string[]): string;
type LocalizeData = Record<string, any>;
type LocalizeArgs = string[] | [...string[], string | LocalizeData];
export { foundryLocalizeIfExist, localize, localizeIfExist, localizePath, sharedLocalize };
export type { LocalizeArgs, LocalizeData };
