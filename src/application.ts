import { EnrichmentOptionsPF2e } from "foundry-pf2e";

export function enrichHTML(content: string | null, options?: EnrichmentOptionsPF2e): Promise<string> {
    return foundry.applications.ux.TextEditor.implementation.enrichHTML(content, options);
}
