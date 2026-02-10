import { KeybindingActionConfig as _KeybindingActionConfig } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function registerModuleKeybinds(keybinds: ModuleKeybindsRegistration): void;
export type KeybindingActionConfig = _KeybindingActionConfig;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
