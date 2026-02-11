import { SettingSubmenuConfig } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function sharedLocalize(key: CollapseOf<LEVIKTIMES>): string;
export declare function settingPath(...path: string[]): string;
export declare function getSetting<T = boolean>(key: string): T;
export declare function setSetting<TSetting>(key: string, value: TSetting): Promise<TSetting>;
export declare function registerSetting(key: string, options: RegisterSettingOptions): void;
export declare function registerSettingMenu(key: string, options: RegisterSettingMenuOptions): void;
export declare function registerModuleSettings(settings: ModuleSettingsRegistration): void;
export type ModuleSettingsRegistration = Record<string, ReadonlyArray<RegisterSettingOptions & {
    key: string;
}>>;
export type SettingRegistration = Parameters<typeof game.settings.register>[2];
export type RegisterSettingMenuOptions = PartialExcept<SettingSubmenuConfig, "type" | "restricted">;
export type RegisterSettingOptions = Omit<SettingRegistration, "name" | "scope" | "onChange" | "choices" | "range"> & {
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
export type RenderSettingsConfigOptions = {
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
export {};
