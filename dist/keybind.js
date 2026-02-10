import { createHTMLElement, htmlQuery, localize, MODULE, R } from ".";
export function registerModuleKeybinds(keybinds) {
    for (const [group, entries] of R.entries(keybinds)) {
        for (const keybind of entries) {
            game.keybindings.register(MODULE.id, `${group}-${keybind.name}`, {
                ...keybind,
                name: MODULE.path("keybindings", group, keybind.name, "name"),
                hint: MODULE.path("keybindings", group, keybind.name, "hint"),
            });
        }
    }
    Hooks.on("renderControlsConfig", (_, html, options) => {
        onRenderControlsConfig(html, options, keybinds);
    });
}
function onRenderControlsConfig(html, _options, keybinds) {
    const id = MODULE.id;
    const tab = htmlQuery(html, `[data-application-part="main"] [data-group="categories"][data-tab="${id}"][data-category="${id}"]`);
    if (!tab)
        return;
    const keybindKeys = R.keys(keybinds);
    for (let i = 0; i < keybindKeys.length; i++) {
        const key = keybindKeys[i];
        if (!key)
            continue;
        const group = htmlQuery(tab, `.form-group[data-action-id^="${MODULE.id}.${key}"]`);
        const title = createHTMLElement("h4", {
            content: localize.ifExist("keybindings", key, "title") ?? localize("settings", key, "title"),
        });
        title.style.marginBlock = i === 0 ? "0" : "0.5em 0em";
        group?.before(title);
    }
}
