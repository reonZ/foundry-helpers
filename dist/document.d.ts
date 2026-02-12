import { ActorPF2e, MacroPF2e, UserPF2e } from "foundry-pf2e";
import { ClientDocument } from "foundry-pf2e/foundry/client/documents/abstract/_module.mjs";
import { DocumentUUID } from "foundry-pf2e/foundry/client/utils/_module.mjs";
import { Token } from ".";
declare function getInMemory<T>(obj: ClientDocument | Token, ...path: string[]): T | undefined;
declare function setInMemory<T>(obj: ClientDocument | Token, ...args: [...string[], T]): boolean;
declare function deleteInMemory(obj: ClientDocument | Token, ...path: string[]): boolean;
/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/module/actor/item-transfer.ts#L117
 */
declare function getPreferredName(document: ActorPF2e | UserPF2e): string;
declare function isScriptMacro(doc: any): doc is MacroPF2e;
declare function isValidTargetDocuments(target: unknown): target is TargetDocuments;
export { deleteInMemory, getInMemory, getPreferredName, isScriptMacro, isValidTargetDocuments, setInMemory };
export type { ClientDocument, DocumentUUID };
