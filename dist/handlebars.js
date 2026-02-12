import { localize, MODULE, R, SYSTEM } from ".";
function render(...args) {
    const data = args.at(-1);
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);
    data.i18n = templateLocalize(R.isString(data.i18n) ? data.i18n : template.replace(/\//, "."));
    data.isSF2e = SYSTEM.isSF2e;
    return foundry.applications.handlebars.renderTemplate(path, data);
}
function templateLocalize(...subKeys) {
    const fn = (...args) => {
        const { hash } = args.pop();
        return localize(...subKeys, ...args, hash);
    };
    Object.defineProperties(fn, {
        tooltip: {
            value: (...args) => {
                const { hash } = args.pop();
                return templateTooltip(...subKeys, ...args, hash);
            },
            enumerable: false,
            configurable: false,
        },
        root: {
            value: (...args) => {
                const { hash } = args.pop();
                return localize(...args, hash);
            },
            enumerable: false,
            configurable: false,
        },
    });
    return fn;
}
function templateTooltip(...args) {
    const options = args[0];
    const tooltip = options.localize !== false ? localize(...args) : args[0];
    return `data-tooltip="${tooltip}"`;
    // return `data-tooltip="${tooltip}" aria-label="${tooltip}"`;
}
export { render, templateLocalize };
