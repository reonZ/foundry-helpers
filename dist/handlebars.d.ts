declare function render(...args: HandlebarsRenderArgs): Promise<string>;
declare function preSyncElement(newElement: HTMLElement, priorElement: Maybe<HTMLElement>, ...scrollable: string[]): SyncElementState;
declare function postSyncElement(newElement: HTMLElement, state: SyncElementState): void;
type SyncElementState = {
    focus?: string;
    scrollPositions: [HTMLElement, number][];
};
type HandlebarsRenderData = {
    [k: string]: any;
    i18n?: string;
};
type HandlebarsRenderArgs = [string, ...string[], HandlebarsRenderData];
export { postSyncElement, preSyncElement, render };
export type { HandlebarsRenderArgs, HandlebarsRenderData };
