import { createHTMLElement, htmlClosest, htmlQuery, localize, MODULE, R, SettingSubmenuConfig, userIsGM } from ".";

function settingPath(...path: string[]): string {
    return MODULE.path("settings", ...path);
}

function getSetting<T = boolean>(key: string): T;
function getSetting(key: string) {
    return game.settings.get(MODULE.id, key);
}

function setSetting<TSetting>(key: string, value: TSetting): Promise<TSetting>;
function setSetting(key: string, value: any) {
    return game.settings.set(MODULE.id, key, value);
}

function getUserSetting<T>(key: string, userId: string): UserSetting<T> | undefined;
function getUserSetting<T>(key: string, userId?: string): UserSetting<T>[];
function getUserSetting<T>(key: string, userId?: string): UserSetting<T> | UserSetting<T>[] | undefined {
    const moduleKey = MODULE.path(key);
    const storage = game.settings.storage.get("user");
    return userId
        ? (storage.find((setting) => setting.user === userId && setting.key === moduleKey) as any)
        : (storage.filter((setting) => !!setting.user && setting.key === moduleKey) as any);
}

function registerSetting(key: string, options: RegisterSettingOptions) {
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

function registerSettingMenu(key: string, options: RegisterSettingMenuOptions) {
    options.name ??= settingPath("menus", key, "name");
    options.label ??= settingPath("menus", key, "label");
    options.hint ??= settingPath("menus", key, "hint");
    options.icon ??= "fas fa-cogs";

    game.settings.registerMenu(MODULE.id, key, options as SettingSubmenuConfig);
}

function registerModuleSettings(settings: ModuleSettingsRegistration) {
    for (const [group, entries] of R.entries(settings)) {
        for (const setting of entries) {
            setting.key = group ? `${group}.${setting.key}` : setting.key;
            registerSetting(setting.key, setting);
        }
    }

    Hooks.on("renderSettingsConfig", (_, html, options: RenderSettingsConfigOptions) =>
        onRenderSettingsConfig(html, options, settings),
    );
}

function onRenderSettingsConfig(
    html: HTMLElement,
    options: RenderSettingsConfigOptions,
    settings: ModuleSettingsRegistration,
) {
    const id = MODULE.id;
    const category = options.categories[id];
    if (!category) return;

    const tab = htmlQuery(
        html,
        `[data-application-part="main"] [data-group="categories"][data-tab="${id}"][data-category="${id}"]`,
    );

    if (!tab) return;

    const gmOnlyLabel = localize.shared("gmOnly");
    const playerOnlyLabel = localize.shared("playerOnly");
    const reloadLabel = localize.shared("reloadRequired");
    const gmOnly = `<i class="fa-solid fa-crown" data-tooltip="${gmOnlyLabel}"></i>`;
    const player = `<i class="fa-solid fa-user-secret" data-tooltip="${playerOnlyLabel}"></i>`;
    const reload = `<i class="fa-solid fa-rotate-left" data-tooltip="${reloadLabel}"></i>`;

    for (const entry of category.entries) {
        if (entry.menu) continue;

        const name = entry.field.name;
        const extras: string[] = [];
        const setting = game.settings.settings.get(name) as RegisterSettingOptions;
        if (!setting) continue;

        if (setting.gmOnly) {
            extras.push(gmOnly);
        }

        if (setting.playerOnly) {
            extras.push(player);
        }

        if (setting.requiresReload) {
            extras.push(reload);
        }

        if (!extras.length) continue;

        const input = htmlQuery(tab, `[name="${name}"]`);
        const group = htmlClosest(input, ".form-group");
        const label = htmlQuery(group, "label");
        const span = createHTMLElement("span", {
            content: `  ${extras.join(", ")}`,
        });

        label?.append(span);
    }

    const settingKeys = R.keys(settings);
    for (let i = 0; i < settingKeys.length; i++) {
        const key = settingKeys[i];
        if (!key) continue;

        const input = htmlQuery(tab, `[name^="${MODULE.id}.${key}"]`);
        const group = htmlClosest(input, ".form-group");
        const title = createHTMLElement("h4", {
            content: localize("settings", key, "title"),
        });

        title.style.marginBlock = i === 0 ? "0" : "0.5em 0em";

        group?.before(title);
    }
}

type ModuleSettingsRegistration = Record<string, ReadonlyArray<RegisterSettingOptions & { key: string }>>;

type SettingRegistration = Parameters<typeof game.settings.register>[2];

type RegisterSettingMenuOptions = PartialExcept<SettingSubmenuConfig, "type" | "restricted">;

type RegisterSettingOptions = Omit<SettingRegistration, "name" | "scope" | "onChange" | "choices" | "range"> & {
    broadcast?: boolean;
    choices?: Record<string, string> | string[] | ReadonlyArray<string>;
    gmOnly?: boolean;
    name?: string;
    onChange?: (value: any, operation: object, userId: string) => void | Promise<void>;
    playerOnly?: boolean;
    range?: { min?: number; max?: number; step?: number };
    scope: "world" | "user";
};

type RenderSettingsConfigOptions = {
    categories: Record<string, RenderSettingsConfigCategory>;
};

type RenderSettingsConfigCategory = {
    id: string;
    entries: RenderSettingsConfigCategoryEntry[];
};

type RenderSettingsConfigCategoryEntry = {
    label: string;
} & ({ menu: true; key: string } | { menu: false; field: { name: string } });

type UserSetting<T> = Omit<foundry.documents.Setting, "value"> & { value: T; user: string };

export {
    getUserSetting,
    getSetting,
    registerModuleSettings,
    registerSetting,
    registerSettingMenu,
    setSetting,
    settingPath,
};
export type {
    ModuleSettingsRegistration,
    RegisterSettingMenuOptions,
    RegisterSettingOptions,
    RenderSettingsConfigOptions,
    SettingRegistration,
};
