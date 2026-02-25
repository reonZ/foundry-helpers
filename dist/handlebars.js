import { htmlQuery, localize, MODULE, R, SYSTEM } from ".";
function render(...args) {
    const data = args.at(-1);
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);
    data.i18n = localize.i18n(R.isString(data.i18n) ? data.i18n : template.replace(/\//, "."));
    data.isSF2e = SYSTEM.isSF2e;
    return foundry.applications.handlebars.renderTemplate(path, data);
}
function preSyncElement(newElement, priorElement, ...scrollable) {
    const state = { focus: undefined, scrollPositions: [] };
    if (!priorElement) {
        return state;
    }
    const focus = priorElement.querySelector(":focus");
    if (focus?.name) {
        state.focus = `${focus.tagName}[name="${focus.name}"]`;
    }
    else if (focus?.dataset.itemId) {
        state.focus = `${focus.tagName}[data-item-id="${focus.dataset.itemId}"]`;
    }
    if (scrollable.length === 0) {
        scrollable.push("");
    }
    for (const selector of scrollable) {
        const el0 = selector === "" ? priorElement : htmlQuery(priorElement, selector);
        if (el0) {
            const el1 = selector === "" ? newElement : htmlQuery(newElement, selector);
            if (el1) {
                state.scrollPositions.push([el1, el0.scrollTop]);
            }
        }
    }
    return state;
}
function postSyncElement(newElement, state) {
    if (state.focus) {
        const newFocus = htmlQuery(newElement, state.focus);
        newFocus?.focus();
    }
    for (const [el, scrollTop] of state.scrollPositions) {
        el.scrollTop = scrollTop;
    }
}
export { postSyncElement, preSyncElement, render };
