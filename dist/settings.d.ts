import { SettingSubmenuConfig } from ".";
declare function settingPath(...path: string[]): string;
declare function getSetting<T = boolean>(key: string): T;
declare function setSetting<TSetting>(key: string, value: TSetting): Promise<TSetting>;
declare function registerSetting(key: string, options: RegisterSettingOptions): void;
declare function registerSettingMenu(key: string, options: RegisterSettingMenuOptions): void;
declare function registerModuleSettings(settings: ModuleSettingsRegistration): void;
type ModuleSettingsRegistration = Record<string, ReadonlyArray<RegisterSettingOptions & {
    key: string;
}>>;
type SettingRegistration = Parameters<typeof game.settings.register>[2];
type RegisterSettingMenuOptions = PartialExcept<SettingSubmenuConfig, "type" | "restricted">;
type RegisterSettingOptions = Omit<SettingRegistration, "name" | "scope" | "onChange" | "choices" | "range"> & {
    broadcast?: boolean;
    choices?: Record<string, string> | string[] | ReadonlyArray<string>;
    gmOnly?: boolean;
    name?: string;
    onChange?: (value: any, operation: object, userId: string) => void | Promise<void>;
    playerOnly?: boolean;
    range?: {
        min?: number;
        max?: number;
        step?: number;
    };
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
} & ({
    menu: true;
    key: string;
} | {
    menu: false;
    field: {
        name: string;
    };
});
export { getSetting, registerModuleSettings, registerSetting, registerSettingMenu, setSetting, settingPath };
export type { ModuleSettingsRegistration, RegisterSettingMenuOptions, RegisterSettingOptions, RenderSettingsConfigOptions, SettingRegistration, };
