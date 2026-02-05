import { MODULE, R, userIsGM } from ".";
export function settingPath(...path) {
    return MODULE.path("settings", ...path);
}
export function getSetting(key) {
    return game.settings.get(MODULE.id, key);
}
export function setSetting(key, value) {
    return game.settings.set(MODULE.id, key, value);
}
export function registerSetting(key, options) {
    const isGM = userIsGM();
    if ((options.gmOnly && !isGM) || (options.playerOnly && isGM))
        return;
    if ("choices" in options && Array.isArray(options.choices)) {
        options.choices = R.fromKeys(options.choices, (choice) => settingPath(key, "choices", choice));
    }
    options.name ??= settingPath(key, "name");
    options.hint ??= settingPath(key, "hint");
    options.config ??= true;
    if (options.scope === "user" && !options.broadcast && options.onChange) {
        const _onChange = options.onChange;
        options.onChange = (value, operation, userId) => {
            if (userId !== game.userId)
                return;
            _onChange(value, operation, userId);
        };
    }
    game.settings.register(MODULE.id, key, options);
}
export function registerSettingMenu(key, options) {
    options.name ??= settingPath("menus", key, "name");
    options.label ??= settingPath("menus", key, "label");
    options.hint ??= settingPath("menus", key, "hint");
    options.icon ??= "fas fa-cogs";
    game.settings.registerMenu(MODULE.id, key, options);
}
