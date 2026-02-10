import { R } from ".";

export function htmlQuery<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K,
): HTMLElementTagNameMap[K] | null;
export function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
export function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
export function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(parent instanceof Element)) return null;
    return parent.querySelector<HTMLElement>(selectors);
}

export function htmlClosest<K extends keyof HTMLElementTagNameMap>(
    child: MaybeHTML,
    selectors: K,
): HTMLElementTagNameMap[K] | null;
export function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
export function htmlClosest<E extends HTMLElement = HTMLElement>(child: MaybeHTML, selectors: string): E | null;
export function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(child instanceof Element)) return null;
    return child.closest<HTMLElement>(selectors);
}

export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
    nodeName: K,
    { classes = [], dataset = {}, content, id, style }: CreateHTMLElementOptions = {},
): HTMLElementTagNameMap[K] {
    const element = document.createElement(nodeName);

    if (element instanceof HTMLButtonElement) {
        element.type = "button";
    }

    if (style) {
        assignStyle(element, style);
    }

    if (id) {
        element.id = id;
    }

    if (classes.length > 0) {
        element.classList.add(...classes);
    }

    for (const [key, value] of Object.entries(dataset)) {
        if (R.isNullish(value) || value === false) continue;
        element.dataset[key] = value === true ? "" : String(value);
    }

    if (R.isString(content)) {
        element.innerHTML = content;
    } else if (content instanceof Element) {
        element.append(content);
    } else if (content) {
        element.append(...content);
    }

    return element;
}

export function createHTMLElementContent(options?: CreateHTMLElementOptions): HTMLElement {
    return createHTMLElement("div", options).firstChild as HTMLElement;
}

export function createButtonElement(options: CreateHTMLButtonElementOptions): HTMLButtonElement {
    let content = "";

    if (options.icon) {
        content += `<i class="${options.icon}"> `;
    }

    if (options.label) {
        content += options.label;
    }

    return createHTMLElement("button", { ...options, content });
}

export function addListener<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: K,
    ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>
): void;
export function addListener<TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, TEvent>
): void;
export function addListener<E extends HTMLElement, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<E, TEvent>
): void;
export function addListener(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, EventType>
): void {
    if (!(parent instanceof Element || parent instanceof Document)) return;

    const element = parent.querySelector(selectors);
    if (!(element instanceof HTMLElement)) return;

    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];

    element.addEventListener(event, (e) => listener(element, e), useCapture);
}

export function addListenerAll<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: K,
    ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>
): void;
export function addListenerAll<TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, TEvent>
): void;
export function addListenerAll<E extends HTMLElement, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<E, TEvent>
): void;
export function addListenerAll(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, EventType>
): void {
    if (!(parent instanceof Element || parent instanceof Document)) return;

    const elements = parent.querySelectorAll(selectors);
    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) continue;
        element.addEventListener(event, (e) => listener(element, e), useCapture);
    }
}

export function createFormData<T extends Record<string, unknown>>(html: HTMLElement, expand = false): T {
    const form = html instanceof HTMLFormElement ? html : htmlQuery(html, "form");
    if (!form) return {} as T;

    const formData = new foundry.applications.ux.FormDataExtended(form, { disabled: true, readonly: true });
    const data = R.mapValues(formData.object, (value) => {
        return typeof value === "string" ? value.trim() : value;
    });

    for (const element of form.elements) {
        if (!(element instanceof HTMLInputElement) || element.type !== "file") continue;

        data[element.name] = element.files?.[0];
    }

    return (expand ? (foundry.utils.expandObject(data) as Record<string, unknown>) : data) as T;
}

export function assignStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
    Object.assign(el.style, style);
}

export function styleValue(value: number): `${number}px` {
    return `${value}px`;
}

export function setStyleProperty(html: Maybe<HTMLElement>, property: string, value: number) {
    html?.style.setProperty(property, styleValue(value));
}

export type CreateHTMLElementOptions = {
    classes?: string[];
    content?: string | HTMLCollection | (Element | string)[] | Element;
    dataset?: Record<string, string | number | boolean | null | undefined>;
    id?: string;
    style?: Partial<CSSStyleDeclaration>;
};

export type CreateHTMLButtonElementOptions = Omit<CreateHTMLElementOptions, "id" | "content"> &
    RequireAtLeastOne<{ icon?: string; label?: string }>;

type ListenerCallbackArgs<E extends HTMLElement, TEvent extends EventType> =
    | [TEvent, ListenerCallback<E, TEvent>, boolean]
    | [TEvent, ListenerCallback<E, TEvent>]
    | [ListenerCallback<E, TEvent>, boolean]
    | [ListenerCallback<E, TEvent>];

type ListenerCallback<TElement extends HTMLElement, TEvent extends EventType> = (
    element: TElement,
    event: HTMLElementEventMap[TEvent],
) => void;
