import { ActorType, EnrichmentOptionsPF2e, ItemType } from "foundry-pf2e";
import { ContextMenuEntry as _ContextMenuEntry } from "foundry-pf2e/foundry/client/applications/ux/context-menu.mjs";

function renderApplications(type: string | string[]) {
    const types = Array.isArray(type) ? type : [type];
    const apps = [...R.values(ui.windows), ...foundry.applications.instances.values()].filter((app) =>
        types.some((x) => isInstanceOf(app, x)),
    );

    for (const app of apps) {
        app.render();
    }
}

export function renderCharacterSheets() {
    renderApplications("CharacterSheetPF2e");
}

export function renderActorSheets(type: ActorSheetType | ActorSheetType[] = ["ActorSheetPF2e"]) {
    renderApplications(type);
}

export function renderItemSheets(type: ItemSheetType | ItemSheetType[] = ["ItemSheetPF2e"]) {
    renderApplications(type);
}

export function enrichHTML(content: string | null, options?: EnrichmentOptionsPF2e): Promise<string> {
    return foundry.applications.ux.TextEditor.implementation.enrichHTML(content, options);
}

type ActorSheetType = "ActorSheetPF2e" | `${Capitalize<ActorType>}SheetPF2e`;

type ItemSheetType = "ItemSheetPF2e" | "AbilitySheetPF2e" | `${Capitalize<Exclude<ItemType, "action">>}SheetPF2e`;

export type ContextMenuEntry = _ContextMenuEntry;
