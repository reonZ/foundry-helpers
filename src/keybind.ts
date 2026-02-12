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

export class ToggleableKeybind {
    #actions: { onDown: KeybindAction; onUp: KeybindAction };
    #options: _KeybindingActionConfig;

    constructor(options: KeybindingActionConfig) {
        this.#actions = {
            onDown: () => {},
            onUp: () => {},
        };
        this.#options = options;
    }

    get configs(): KeybindingActionConfig {
        return {
            ...this.#options,
            onDown: (context: KeyboardEventContext) => {
                this.#actions.onDown(context);
            },
            onUp: (context: KeyboardEventContext) => {
                this.#actions.onUp(context);
            },
        };
    }

    activate() {
        this.#actions.onDown = (context: KeyboardEventContext) => {
            this.#options.onDown?.(context);
        };

        this.#actions.onUp = (context: KeyboardEventContext) => {
            this.#options.onUp?.(context);
        };
    }

    disable() {
        this.#actions.onDown = () => {};
        this.#actions.onUp = () => {};
    }

    toggle(enabled: boolean) {
        if (enabled) {
            this.activate();
        } else {
            this.disable();
        }
    }
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

type KeybindAction = (context: KeyboardEventContext) => void;

export type KeybindingActionConfig = _KeybindingActionConfig;
export type ModuleKeybindsRegistration = Record<string, ReadonlyArray<KeybindingActionConfig>>;
