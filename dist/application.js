import { isInstanceOf, R } from ".";
function renderApplications(type) {
    const types = Array.isArray(type) ? type : [type];
    const apps = [...R.values(ui.windows), ...foundry.applications.instances.values()].filter((app) => types.some((x) => isInstanceOf(app, x)));
    for (const app of apps) {
        app.render();
    }
}
export function renderCharacterSheets() {
    renderApplications("CharacterSheetPF2e");
}
export function renderActorSheets(type = ["ActorSheetPF2e"]) {
    renderApplications(type);
}
export function renderItemSheets(type = ["ItemSheetPF2e"]) {
    renderApplications(type);
}
export function enrichHTML(content, options) {
    return foundry.applications.ux.TextEditor.implementation.enrichHTML(content, options);
}
