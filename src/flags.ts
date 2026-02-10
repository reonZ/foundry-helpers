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

function flagPath(...path: string[]): string {
    return `flags.${MODULE.path(...path)}`;
}

function unsetFlagPath(...path: [string, ...string[]]): string {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}

export function getFlagProperty<T>(obj: object, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(obj, flagPath(...path)) as T | undefined;
}

export function setFlagProperty<T extends object>(obj: T, ...args: [...string[], any]): T {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), value);
    return obj;
}

export function setFlagProperties<T extends object>(
    obj: T,
    ...args: [...string[], properties: Record<string, any>]
): T {
    const properties = args.pop();
    foundry.utils.setProperty(obj, flagPath(...(args as string[])), properties);
    return obj;
}

export function unsetFlagProperty<T extends object>(obj: T, ...path: [string, ...string[]]): T {
    foundry.utils.setProperty(obj, unsetFlagPath(...path), null);
    return obj;
}

export function deleteFlagProperty<T extends object>(obj: T, ...path: string[]): T {
    foundry.utils.deleteProperty(obj, flagPath(...path));
    return obj;
}
