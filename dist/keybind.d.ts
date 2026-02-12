import { KeybindingActionConfig as _KeybindingActionConfig, ModifierKey } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function isHoldingModifierKey(key: ModifierKey | ModifierKey[]): boolean;
export declare function registerModuleKeybinds(keybinds: ModuleKeybindsRegistration): void;
export declare class ToggleableKeybind {
    #private;
    constructor(options: KeybindingActionConfig);
    get configs(): KeybindingActionConfig;
    activate(): void;
    disable(): void;
    toggle(enabled: boolean): void;
}
export type KeybindingActionConfig = _KeybindingActionConfig;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
