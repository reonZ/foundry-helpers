import { BrowserFilter, TabName, TraitData } from "@7h3laughingman/pf2e-types";
/**
 * old system method that no longer exist
 */
declare function filterTraits(traits: string[], selected: TraitData["selected"], condition: TraitData["conjunction"]): boolean;
declare function openBrowserTab(tab: TabName, data: BrowserData | null, filters?: BrowserFilter): Promise<void>;
type BrowserData = {
    callback: (event: MouseEvent) => Promise<void>;
    label: string;
    onRender?: (html: HTMLElement) => void;
};
export { filterTraits, openBrowserTab };
export type { BrowserData };
