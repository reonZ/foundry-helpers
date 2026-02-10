import { KeybindingActionConfig as _KeybindingActionConfig, KeyboardEventContext, ModifierKey } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function isHoldingModifierKey(key: ModifierKey | ModifierKey[]): boolean;
export declare function registerModuleKeybinds(keybinds: ModuleKeybindsRegistration): void;
export declare function createToggleKeybind(options: KeybindingActionConfig): {
    configs: {
        onDown: (context: KeyboardEventContext) => void;
        onUp: (context: KeyboardEventContext) => void;
        namespace?: string;
        name: string;
        hint?: string;
        uneditable?: import("foundry-pf2e/foundry/client/_types.mjs").KeybindingActionBinding[];
        editable?: import("foundry-pf2e/foundry/client/_types.mjs").KeybindingActionBinding[];
        repeat?: boolean;
        restricted?: boolean;
        reservedModifiers?: ModifierKey[];
        precedence?: number;
        order?: number;
    };
    activate(): void;
    disable(): void;
    toggle(enabled: boolean): void;
};
export type KeybindingActionConfig = _KeybindingActionConfig;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
