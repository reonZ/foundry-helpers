import { SettingSubmenuConfig } from "foundry-pf2e/foundry/client/_module.mjs";
import { MODULE, R, userIsGM } from ".";

export function settingPath(...path: string[]): string {
    return MODULE.path("settings", ...path);
}

export function getSetting<T = boolean>(key: string): T;
export function getSetting(key: string) {
    return game.settings.get(MODULE.id, key);
}

export function setSetting<TSetting>(key: string, value: TSetting): Promise<TSetting>;
export function setSetting(key: string, value: any) {
    return game.settings.set(MODULE.id, key, value);
}

export function registerSetting(key: string, options: RegisterSettingOptions) {
    const isGM = userIsGM();
    if ((options.gmOnly && !isGM) || (options.playerOnly && isGM)) return;

    if ("choices" in options && Array.isArray(options.choices)) {
        options.choices = R.fromKeys(options.choices, (choice) => settingPath(key, "choices", choice));
    }

    options.name ??= settingPath(key, "name");
    options.hint ??= settingPath(key, "hint");
    options.config ??= true;

    if (options.scope === "user" && !options.broadcast && options.onChange) {
        const _onChange = options.onChange;
        options.onChange = (value, operation, userId) => {
            if (userId !== game.userId) return;
            _onChange(value, operation, userId);
        };
    }

    game.settings.register(MODULE.id, key, options as SettingRegistration);
}

export function registerSettingMenu(key: string, options: RegisterSettingMenuOptions) {
    options.name ??= settingPath("menus", key, "name");
    options.label ??= settingPath("menus", key, "label");
    options.hint ??= settingPath("menus", key, "hint");
    options.icon ??= "fas fa-cogs";

    game.settings.registerMenu(MODULE.id, key, options as SettingSubmenuConfig);
}

export type SettingRegistration = Parameters<typeof game.settings.register>[2];

export type RegisterSettingMenuOptions = PartialExcept<SettingSubmenuConfig, "type" | "restricted">;

type RegisterSettingOptions = Omit<SettingRegistration, "name" | "scope" | "onChange" | "choices"> & {
    broadcast?: boolean;
    gmOnly?: boolean;
    name?: string;
    playerOnly?: boolean;
    scope: "world" | "user";
    choices?: Record<string, string> | string[] | ReadonlyArray<string>;
    onChange?: (value: any, operation: object, userId: string) => void | Promise<void>;
};

export type RenderSettingsConfigOptions = {
    categories: Record<string, RenderSettingsConfigCategory>;
};

type RenderSettingsConfigCategory = {
    id: string;
    entries: RenderSettingsConfigCategoryEntry[];
};

type RenderSettingsConfigCategoryEntry = {
    label: string;
} & ({ menu: true; key: string } | { menu: false; field: { name: string } });
