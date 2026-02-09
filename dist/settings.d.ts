import { SettingSubmenuConfig } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function settingPath(...path: string[]): string;
export declare function getSetting<T = boolean>(key: string): T;
export declare function setSetting<TSetting>(key: string, value: TSetting): Promise<TSetting>;
export declare function registerSetting(key: string, options: RegisterSettingOptions): void;
export declare function registerSettingMenu(key: string, options: RegisterSettingMenuOptions): void;
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
