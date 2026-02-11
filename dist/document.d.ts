import { ActorPF2e, MacroPF2e, UserPF2e } from "foundry-pf2e";
import { Token } from ".";
export declare function getInMemory<T>(obj: ClientDocument | Token, ...path: string[]): T | undefined;
export declare function setInMemory<T>(obj: ClientDocument | Token, ...args: [...string[], T]): boolean;
export declare function deleteInMemory(obj: ClientDocument | Token, ...path: string[]): boolean;
/**
 * https://github.com/foundryvtt/pf2e/blob/89892b6fafec1456a0358de8c6d7b102e3fe2da2/src/module/actor/item-transfer.ts#L117
 */
export declare function getPreferredName(document: ActorPF2e | UserPF2e): string;
export declare function isScriptMacro(doc: any): doc is MacroPF2e;
export declare function isValidTargetDocuments(target: unknown): target is TargetDocuments;
