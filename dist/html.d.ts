declare function htmlQuery<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
declare function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K][];
declare function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E[];
declare function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[];
declare function htmlClosest<K extends keyof HTMLElementTagNameMap>(child: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlClosest<E extends HTMLElement = HTMLElement>(child: MaybeHTML, selectors: string): E | null;
declare function firstElementWithText(el: Maybe<Element>, skipEmpty?: boolean): HTMLElement | null;
declare function createHTMLElement<K extends keyof HTMLElementTagNameMap>(nodeName: K, { classes, dataset, content, id, style }?: CreateHTMLElementOptions): HTMLElementTagNameMap[K];
declare function createHTMLElementContent(options?: CreateHTMLElementOptions): HTMLElement;
declare function createButtonElement(options: CreateHTMLButtonElementOptions): HTMLButtonElement;
declare function createInputElement(type: "text" | "number" | "radio" | "checkbox", name: string, value: string | number | boolean, options?: CreateHTMLInputElementOptions): HTMLInputElement;
declare function addListener<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(parent: MaybeHTML, selectors: K, ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>): void;
declare function addListener<TEvent extends EventType = "click">(parent: MaybeHTML, selectors: string, ...args: ListenerCallbackArgs<HTMLElement, TEvent>): void;
declare function addListener<E extends HTMLElement, TEvent extends EventType = "click">(parent: MaybeHTML, selectors: string, ...args: ListenerCallbackArgs<E, TEvent>): void;
declare function addListenerAll<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(parent: MaybeHTML, selectors: K, ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>): void;
declare function addListenerAll<TEvent extends EventType = "click">(parent: MaybeHTML, selectors: string, ...args: ListenerCallbackArgs<HTMLElement, TEvent>): void;
declare function addListenerAll<E extends HTMLElement, TEvent extends EventType = "click">(parent: MaybeHTML, selectors: string, ...args: ListenerCallbackArgs<E, TEvent>): void;
declare function addEnterKeyListeners(html: HTMLElement, inputType?: "number" | "text" | "all"): void;
declare function getInputValue(el: HTMLInputElement | HTMLSelectElement): string | number | boolean;
/**
 * repurposed version of
 * https://github.com/foundryvtt/pf2e/blob/c0cfa1f4c266d7d843966b50a9fd1a34d42b2051/src/module/actor/sheet/item-summary-renderer.ts#L25
 */
declare function toggleSummary(summaryElem: HTMLElement): Promise<void>;
declare function createFormData<T extends Record<string, unknown>>(html: HTMLFormElement, expand?: boolean): T;
declare function createFormData<T extends Record<string, unknown>>(html: HTMLElement, expand?: boolean): T | null;
declare function assignStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>): void;
declare function styleValue(value: number): `${number}px`;
declare function setStyleProperty(html: Maybe<HTMLElement>, property: string, value: number): void;
declare function setStyleProperties(el: HTMLElement, properties: Record<string, string | number | boolean>): void;
declare function registerCustomElement(tag: string, element: CustomElementConstructor): void;
type CreateHTMLElementOptions = {
    classes?: string[];
    content?: string | HTMLCollection | (Element | string)[] | Element;
    dataset?: Record<string, string | number | boolean | null | undefined>;
    id?: string;
    style?: Partial<CSSStyleDeclaration>;
};
type CreateHTMLButtonElementOptions = Omit<CreateHTMLElementOptions, "id" | "content"> & RequireAtLeastOne<{
    icon?: string;
    label?: string;
}>;
type ListenerCallbackArgs<E extends HTMLElement, TEvent extends EventType> = [TEvent, ListenerCallback<E, TEvent>, boolean] | [TEvent, ListenerCallback<E, TEvent>] | [ListenerCallback<E, TEvent>, boolean] | [ListenerCallback<E, TEvent>];
type ListenerCallback<TElement extends HTMLElement, TEvent extends EventType> = (element: TElement, event: HTMLElementEventMap[TEvent]) => void;
type CreateHTMLInputElementOptions = Omit<CreateHTMLElementOptions, "content" | "id"> & {
    checked?: boolean;
};
export { addEnterKeyListeners, addListener, addListenerAll, assignStyle, createButtonElement, createFormData, createHTMLElement, createHTMLElementContent, createInputElement, firstElementWithText, getInputValue, htmlClosest, htmlQuery, htmlQueryAll, registerCustomElement, setStyleProperties, setStyleProperty, styleValue, toggleSummary, };
export type { CreateHTMLButtonElementOptions, CreateHTMLElementOptions };
