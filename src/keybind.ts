import {
    KeybindingActionConfig as _KeybindingActionConfig,
    KeyboardEventContext,
    ModifierKey,
} from "foundry-pf2e/foundry/client/_module.mjs";
import { createHTMLElement, htmlQuery, localize, MODULE, R } from ".";

export function isHoldingModifierKey(key: ModifierKey | ModifierKey[]): boolean {
    const keys = R.isArray(key) ? key : [key];
    return keys.some((key) => game.keyboard.isModifierActive(key));
}

export function registerModuleKeybinds(keybinds: ModuleKeybindsRegistration) {
    for (const [group, entries] of R.entries(keybinds)) {
        for (const keybind of entries) {
            game.keybindings.register(MODULE.id, `${group}-${keybind.name}`, {
                ...keybind,
                name: MODULE.path("keybindings", group, keybind.name, "name"),
                hint: MODULE.path("keybindings", group, keybind.name, "hint"),
            });
        }
    }

    Hooks.on("renderControlsConfig", (_, html, options) => {
        onRenderControlsConfig(html, options, keybinds);
    });
}

export function createToggleKeybind(options: KeybindingActionConfig) {
    const _actions = {
        onDown: (context: KeyboardEventContext) => {},
        onUp: (context: KeyboardEventContext) => {},
    };

    return {
        configs: {
            ...options,
            onDown: (context: KeyboardEventContext) => {
                _actions.onDown(context);
            },
            onUp: (context: KeyboardEventContext) => {
                _actions.onUp(context);
            },
        } satisfies KeybindingActionConfig,
        activate() {
            _actions.onDown = (context: KeyboardEventContext) => {
                options.onDown?.(context);
            };

            _actions.onUp = (context: KeyboardEventContext) => {
                options.onUp?.(context);
            };
        },
        disable() {
            _actions.onDown = (context: KeyboardEventContext) => {};
            _actions.onUp = (context: KeyboardEventContext) => {};
        },
        toggle(enabled: boolean) {
            if (enabled) {
                this.activate();
            } else {
                this.disable();
            }
        },
    };
}

function onRenderControlsConfig(
    html: HTMLFormElement,
    _options: RenderControlsConfigOptions,
    keybinds: ModuleKeybindsRegistration,
) {
    const id = MODULE.id;
    const tab = htmlQuery(
        html,
        `[data-application-part="main"] [data-group="categories"][data-tab="${id}"][data-category="${id}"]`,
    );

    if (!tab) return;

    const keybindKeys = R.keys(keybinds);
    for (let i = 0; i < keybindKeys.length; i++) {
        const key = keybindKeys[i];
        if (!key) continue;

        const group = htmlQuery(tab, `.form-group[data-action-id^="${MODULE.id}.${key}"]`);
        const title = createHTMLElement("h4", {
            content: localize.ifExist("keybindings", key, "title") ?? localize("settings", key, "title"),
        });

        title.style.marginBlock = i === 0 ? "0" : "0.5em 0em";

        group?.before(title);
    }
}

type RenderControlsConfigOptions = {
    categories: Record<string, { entries: RenderControlsConfigCategory[] }>;
};

type RenderControlsConfigCategory = {
    label: string;
    id: string;
};

export type KeybindingActionConfig = _KeybindingActionConfig;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
