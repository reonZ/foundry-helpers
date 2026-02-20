import { localize, MODULE, R, SYSTEM } from ".";
function render(...args) {
    const data = args.at(-1);
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);
    data.i18n = localize.i18n(R.isString(data.i18n) ? data.i18n : template.replace(/\//, "."));
    data.isSF2e = SYSTEM.isSF2e;
    return foundry.applications.handlebars.renderTemplate(path, data);
}
export { render };
