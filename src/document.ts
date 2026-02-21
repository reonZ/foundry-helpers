import { MacroPF2e } from "@7h3laughingman/pf2e-types";
import { ClientDocument, DocumentType, DocumentUUID, MODULE, R, Token } from ".";

async function getDocumentFromUUID<T extends DocumentType, D = InstanceType<DocumentTypeMap[T]>>(
    type: T,
    uuid: Maybe<string>,
): Promise<D | null> {
    if (!uuid) return null;

    const DocumentCls = getDocumentClass(type);
    const doc = await fromUuid(uuid);

    return doc instanceof DocumentCls ? (doc as D) : null;
}

function getInMemory<T>(obj: ClientDocument | Token, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(obj, `modules.${MODULE.id}.${path.join(".")}`) as T | undefined;
}

function setInMemory<T>(obj: ClientDocument | Token, ...args: [...string[], T]): boolean {
    const value = args.pop();
    return foundry.utils.setProperty(obj, `modules.${MODULE.id}.${args.join(".")}`, value);
}

function deleteInMemory(obj: ClientDocument | Token, ...path: string[]) {
    return foundry.utils.deleteProperty(obj, `modules.${MODULE.id}.${path.join(".")}`);
}

function isScriptMacro(doc: any): doc is MacroPF2e {
    return doc instanceof Macro && doc.type === "script";
}

// It also auto converts Token into TokenDocument directly in the provided obj
function isValidTargetDocuments(target: unknown): target is TargetDocuments {
    if (!R.isPlainObject(target)) return false;
    if (!(target.actor instanceof Actor)) return false;

    target.token = target.token instanceof foundry.canvas.placeables.Token ? target.token.document : target.token;
    return !target.token || target.token instanceof TokenDocument;
}

function isDocumentUUID<T extends DocumentUUID>(type: DocumentType, uuid: string, embedded?: boolean): uuid is T {
    if (typeof uuid !== "string") return false;

    try {
        const parseResult = foundry.utils.parseUuid(uuid);
        const isEmbedded = !!parseResult?.embedded.length;
        return parseResult?.type === type && (embedded === true ? isEmbedded : embedded === false ? !isEmbedded : true);
    } catch {
        return false;
    }
}

export {
    deleteInMemory,
    getDocumentFromUUID,
    getInMemory,
    isDocumentUUID,
    isScriptMacro,
    isValidTargetDocuments,
    setInMemory,
};
