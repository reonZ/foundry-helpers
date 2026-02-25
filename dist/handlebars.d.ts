import { TemplateLocalize } from ".";
declare function render(...args: HandlebarsRenderArgs): Promise<string>;
declare function preSyncElement(newElement: HTMLElement, priorElement: Maybe<HTMLElement>, ...scrollable: string[]): SyncElementState;
declare function postSyncElement(newElement: HTMLElement, state: SyncElementState): void;
type RenderData = {
    [k: string]: any;
    i18n: TemplateLocalize;
    isSF2e: boolean;
};
type SyncElementState = {
    focus?: string;
    scrollPositions: [HTMLElement, number][];
};
type HandlebarsRenderData = Omit<RenderData, "i18n" | "isSF2e"> & {
    i18n?: string;
};
type HandlebarsRenderArgs = [...string[], HandlebarsRenderData];
export { postSyncElement, preSyncElement, render };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
