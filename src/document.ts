import { MacroPF2e } from "foundry-pf2e";
import { R } from ".";

export function isScriptMacro(doc: any): doc is MacroPF2e {
    return doc instanceof Macro && doc.type === "script";
}

// It also auto converts Token into TokenDocument directly in the provided obj
export function isValidTargetDocuments(target: unknown): target is TargetDocuments {
    if (!R.isPlainObject(target)) return false;
    if (!(target.actor instanceof Actor)) return false;

    target.token = target.token instanceof foundry.canvas.placeables.Token ? target.token.document : target.token;
    return !target.token || target.token instanceof TokenDocument;
}
