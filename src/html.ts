import { MODULE, R } from ".";

function htmlQuery<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K,
): HTMLElementTagNameMap[K] | null;
function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(parent instanceof Element)) return null;
    return parent.querySelector<HTMLElement>(selectors);
}

function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K,
): HTMLElementTagNameMap[K][];
function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E[];
function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[];
function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[] {
    if (!(parent instanceof Element || parent instanceof Document)) return [];
    return Array.from(parent.querySelectorAll<HTMLElement>(selectors));
}

function htmlClosest<K extends keyof HTMLElementTagNameMap>(
    child: MaybeHTML,
    selectors: K,
): HTMLElementTagNameMap[K] | null;
function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
function htmlClosest<E extends HTMLElement = HTMLElement>(child: MaybeHTML, selectors: string): E | null;
function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(child instanceof Element)) return null;
    return child.closest<HTMLElement>(selectors);
}

function htmlQueryIn<K extends keyof HTMLElementTagNameMap>(
    child: MaybeHTML,
    parentSelector: string,
    siblingSelector: K,
): HTMLElementTagNameMap[K] | null;
function htmlQueryIn(child: MaybeHTML, parentSelector: string, siblingSelector: string): HTMLElement | null;
function htmlQueryIn<E extends HTMLElement = HTMLElement>(
    child: MaybeHTML,
    parentSelector: string,
    siblingSelector: string,
): E | null;
function htmlQueryIn(child: MaybeHTML, parentSelector: string, siblingSelector: string): HTMLElement | null {
    const parent = htmlClosest(child, parentSelector);
    return htmlQuery(parent, siblingSelector);
}

function firstElementWithText(el: Maybe<Element>, skipEmpty = true): HTMLElement | null {
    if (!(el instanceof HTMLElement)) return null;

    const childNodes = el.childNodes;
    if (!childNodes.length) return null;

    for (const child of childNodes) {
        if (child.nodeType === Node.TEXT_NODE && (!skipEmpty || child.textContent?.trim())) {
            return el;
        }
    }

    for (const child of el.children) {
        const withText = firstElementWithText(child);
        if (withText) {
            return withText;
        }
    }

    return null;
}

function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
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

function createHTMLElementContent(options?: CreateHTMLElementOptions): HTMLElement {
    return createHTMLElement("div", options).firstChild as HTMLElement;
}

function createButtonElement(options: CreateHTMLButtonElementOptions): HTMLButtonElement {
    let content = "";

    if (options.icon) {
        content += `<i class="${options.icon}"> `;
    }

    if (options.label) {
        content += options.label;
    }

    return createHTMLElement("button", { ...options, content });
}

function createInputElement(
    type: "text" | "number" | "radio" | "checkbox",
    name: string,
    value: string | number | boolean,
    options?: CreateHTMLInputElementOptions,
): HTMLInputElement {
    const input = createHTMLElement("input", options);

    input.type = type;
    input.name = name;

    if (type === "text") {
        input.value = String(value);
    } else if (type === "number") {
        input.valueAsNumber = Number(value) || 0;
    } else if (type === "checkbox") {
        input.checked = Boolean(value);
    } else {
        input.value = String(value);
        input.checked = !!options?.checked;
    }

    return input;
}

function addListener<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: K,
    ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>
): void;
function addListener<TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, TEvent>
): void;
function addListener<E extends HTMLElement, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<E, TEvent>
): void;
function addListener(
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

function addListenerAll<K extends keyof HTMLElementTagNameMap, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: K,
    ...args: ListenerCallbackArgs<HTMLElementTagNameMap[K], TEvent>
): void;
function addListenerAll<TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<HTMLElement, TEvent>
): void;
function addListenerAll<E extends HTMLElement, TEvent extends EventType = "click">(
    parent: MaybeHTML,
    selectors: string,
    ...args: ListenerCallbackArgs<E, TEvent>
): void;
function addListenerAll(
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

function addEnterKeyListeners(html: HTMLElement, inputType: "number" | "text" | "all" = "all") {
    const types: ("text" | "number")[] = inputType === "all" ? ["text", "number"] : [inputType];
    const selector = types.map((type) => `input[type="${type}"]`).join(", ");

    addListenerAll(html, selector, "keypress", (el, event) => {
        if (event.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            el.blur();
        }
    });
}

function getInputValue(el: HTMLInputElement | HTMLSelectElement) {
    if (el instanceof HTMLSelectElement) {
        return el.value;
    }

    return el.nodeName === "RANGE-PICKER" || ["number", "range"].includes(el.type)
        ? el.valueAsNumber
        : el.type === "checkbox"
          ? el.checked
          : el.value;
}

/**
 * repurposed version of
 * https://github.com/foundryvtt/pf2e/blob/c0cfa1f4c266d7d843966b50a9fd1a34d42b2051/src/module/actor/sheet/item-summary-renderer.ts#L25
 */
async function toggleSummary(summaryElem: HTMLElement) {
    const duration = 0.4;

    if (summaryElem.hidden) {
        await gsap.fromTo(
            summaryElem,
            { height: 0, opacity: 0, hidden: false },
            { height: "auto", opacity: 1, duration },
        );
    } else {
        await gsap.to(summaryElem, {
            height: 0,
            duration,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 0,
            clearProps: "all",
            onComplete: () => {
                summaryElem.hidden = true;
            },
        });
    }
}

function createFormData<T extends Record<string, unknown>>(html: HTMLFormElement, expand?: boolean): T;
function createFormData<T extends Record<string, unknown>>(html: HTMLElement, expand?: boolean): T | null;
function createFormData<T extends Record<string, unknown>>(
    html: HTMLElement | HTMLFormElement,
    expand: boolean = false,
): T | null {
    const form = html instanceof HTMLFormElement ? html : htmlQuery(html, "form");
    if (!form) return null;

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

function assignStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
    Object.assign(el.style, style);
}

function styleValue(value: number): `${number}px` {
    return `${value}px`;
}

function setStyleProperty(html: Maybe<HTMLElement>, property: string, value: number) {
    html?.style.setProperty(property, styleValue(value));
}

function setStyleProperties(el: HTMLElement, properties: Record<string, string | number | boolean>) {
    for (const [property, value] of R.entries(properties)) {
        el.style.setProperty(property, String(value));
    }
}

function registerCustomElement(tag: string, element: CustomElementConstructor) {
    try {
        if (window.customElements.get(tag)) return;
        window.customElements.define(tag, element);
    } catch (error: any) {
        MODULE.error(`an error occurred while registering a custom element: ${tag}`, error);
    }
}

type CreateHTMLElementOptions = {
    classes?: string[];
    content?: string | HTMLCollection | (Element | string)[] | Element;
    dataset?: Record<string, string | number | boolean | null | undefined>;
    id?: string;
    style?: Partial<CSSStyleDeclaration>;
};

type CreateHTMLButtonElementOptions = Omit<CreateHTMLElementOptions, "id" | "content"> &
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

type CreateHTMLInputElementOptions = Omit<CreateHTMLElementOptions, "content" | "id"> & {
    checked?: boolean;
};

export {
    addEnterKeyListeners,
    addListener,
    addListenerAll,
    assignStyle,
    createButtonElement,
    createFormData,
    createHTMLElement,
    createHTMLElementContent,
    createInputElement,
    firstElementWithText,
    getInputValue,
    htmlClosest,
    htmlQuery,
    htmlQueryAll,
    htmlQueryIn,
    registerCustomElement,
    setStyleProperties,
    setStyleProperty,
    styleValue,
    toggleSummary,
};
export type { CreateHTMLButtonElementOptions, CreateHTMLElementOptions };
