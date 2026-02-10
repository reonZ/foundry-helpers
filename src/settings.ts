import { SettingSubmenuConfig } from "foundry-pf2e/foundry/client/_module.mjs";
import { createHTMLElement, htmlClosest, htmlQuery, localize, MODULE, R, userIsGM } from ".";

export function sharedLocalize(key: CollapseOf<LEVIKTIMES>): string {
    return game.i18n.localize(`LEVIKTIMES.${key}`);
}

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

export function registerModuleSettings(settings: ModuleSettingsRegistration) {
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

    const gmOnlyLabel = sharedLocalize("gmOnly");
    const playerOnlyLabel = sharedLocalize("playerOnly");
    const reloadLabel = sharedLocalize("reloadRequired");
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

export type ModuleSettingsRegistration = Record<string, ReadonlyArray<RegisterSettingOptions & { key: string }>>;

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
