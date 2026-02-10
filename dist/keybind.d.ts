import { KeybindingActionConfig } from "foundry-pf2e/foundry/client/_module.mjs";
export declare function registerModuleKeybinds(keybinds: ModuleKeybindsRegistration): void;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
