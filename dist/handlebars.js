import { localize, MODULE, R, SYSTEM } from ".";
export function render(...args) {
    const data = args.at(-1);
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);
    data.isSF2e = SYSTEM.isSF2e;
    data.systemId = SYSTEM.id;
    data.systemPartial = (path) => SYSTEM.relativePath("templates", path);
    data.i18n = localize.sub(R.isString(data.i18n) ? data.i18n : template.replace(/\//, ".")).i18n();
    return foundry.applications.handlebars.renderTemplate(path, data);
}
