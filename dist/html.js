import { R } from ".";
function htmlQuery(parent, selectors) {
    if (!(parent instanceof Element))
        return null;
    return parent.querySelector(selectors);
}
function htmlQueryAll(parent, selectors) {
    if (!(parent instanceof Element || parent instanceof Document))
        return [];
    return Array.from(parent.querySelectorAll(selectors));
}
function htmlClosest(child, selectors) {
    if (!(child instanceof Element))
        return null;
    return child.closest(selectors);
}
function createHTMLElement(nodeName, { classes = [], dataset = {}, content, id, style } = {}) {
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
        if (R.isNullish(value) || value === false)
            continue;
        element.dataset[key] = value === true ? "" : String(value);
    }
    if (R.isString(content)) {
        element.innerHTML = content;
    }
    else if (content instanceof Element) {
        element.append(content);
    }
    else if (content) {
        element.append(...content);
    }
    return element;
}
function createHTMLElementContent(options) {
    return createHTMLElement("div", options).firstChild;
}
function createButtonElement(options) {
    let content = "";
    if (options.icon) {
        content += `<i class="${options.icon}"> `;
    }
    if (options.label) {
        content += options.label;
    }
    return createHTMLElement("button", { ...options, content });
}
function addListener(parent, selectors, ...args) {
    if (!(parent instanceof Element || parent instanceof Document))
        return;
    const element = parent.querySelector(selectors);
    if (!(element instanceof HTMLElement))
        return;
    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];
    element.addEventListener(event, (e) => listener(element, e), useCapture);
}
function addListenerAll(parent, selectors, ...args) {
    if (!(parent instanceof Element || parent instanceof Document))
        return;
    const elements = parent.querySelectorAll(selectors);
    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];
    for (const element of elements) {
        if (!(element instanceof HTMLElement))
            continue;
        element.addEventListener(event, (e) => listener(element, e), useCapture);
    }
}
/**
 * repurposed version of
 * https://github.com/foundryvtt/pf2e/blob/c0cfa1f4c266d7d843966b50a9fd1a34d42b2051/src/module/actor/sheet/item-summary-renderer.ts#L25
 */
async function toggleSummary(summaryElem) {
    const duration = 0.4;
    if (summaryElem.hidden) {
        await gsap.fromTo(summaryElem, { height: 0, opacity: 0, hidden: false }, { height: "auto", opacity: 1, duration });
    }
    else {
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
function createFormData(html, expand = false) {
    const form = html instanceof HTMLFormElement ? html : htmlQuery(html, "form");
    if (!form)
        return null;
    const formData = new foundry.applications.ux.FormDataExtended(form, { disabled: true, readonly: true });
    const data = R.mapValues(formData.object, (value) => {
        return typeof value === "string" ? value.trim() : value;
    });
    for (const element of form.elements) {
        if (!(element instanceof HTMLInputElement) || element.type !== "file")
            continue;
        data[element.name] = element.files?.[0];
    }
    return (expand ? foundry.utils.expandObject(data) : data);
}
function assignStyle(el, style) {
    Object.assign(el.style, style);
}
function styleValue(value) {
    return `${value}px`;
}
function setStyleProperty(html, property, value) {
    html?.style.setProperty(property, styleValue(value));
}
export { addListener, addListenerAll, assignStyle, createButtonElement, createFormData, createHTMLElement, createHTMLElementContent, htmlClosest, htmlQuery, htmlQueryAll, setStyleProperty, styleValue, toggleSummary, };
