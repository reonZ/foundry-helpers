import { KeybindingActionConfig, KeyboardEventContext, ModifierKey } from "foundry-pf2e/foundry/client/_module.mjs";
declare function isHoldingModifierKey(key: ModifierKey | ModifierKey[]): boolean;
declare function registerKeybind(name: string, data: Partial<KeybindingActionConfig>): void;
declare function registerModuleKeybinds(keybinds: ModuleKeybinds): void;
declare function createToggleKeybind(options: KeybindingActionConfig): {
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
type ModuleKeybinds = Record<string, ReadonlyArray<KeybindingActionConfig>>;
export { createToggleKeybind, isHoldingModifierKey, registerKeybind, registerModuleKeybinds };
export type { KeybindingActionConfig };
