import { MODULE } from ".";

type Document = foundry.abstract.Document;

export function getFlag<T>(doc: Document, ...path: string[]): T | undefined {
    return doc.getFlag(MODULE.id, path.join(".")) as T | undefined;
}

export function setFlag<D extends Document, T>(doc: D, ...args: [...string[], T]): Promise<D> {
    const value = args.pop();
    return doc.setFlag(MODULE.id, args.join("."), value);
}

export function unsetFlag<D extends Document>(doc: D, ...path: string[]): Promise<D | undefined> {
    return doc.unsetFlag(MODULE.id, path.join("."));
}
