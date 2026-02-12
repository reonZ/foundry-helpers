import { MODULE } from ".";

type Document = foundry.abstract.Document;

function getFlag<T>(doc: Document, ...path: string[]): T | undefined {
    return doc.getFlag(MODULE.id, path.join(".")) as T | undefined;
}

function setFlag<D extends Document, T>(doc: D, ...args: [...string[], T]): Promise<D> {
    const value = args.pop();
    return doc.setFlag(MODULE.id, args.join("."), value);
}

function unsetFlag<D extends Document>(doc: D, ...path: string[]): Promise<D | undefined> {
    return doc.unsetFlag(MODULE.id, path.join("."));
}

function flagPath(...path: string[]): string {
    return `flags.${MODULE.path(...path)}`;
}

function unsetFlagPath(...path: [string, ...string[]]): string {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}

function getFlagProperty<T>(obj: object, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(obj, flagPath(...path)) as T | undefined;
}

function setFlagProperty<T extends object>(obj: T, ...args: [...string[], any]): T {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), value);
    return obj;
}

function setFlagProperties<T extends object>(obj: T, ...args: [...string[], properties: Record<string, any>]): T {
    const properties = args.pop();
    foundry.utils.setProperty(obj, flagPath(...(args as string[])), properties);
    return obj;
}

function unsetFlagProperty<T extends object>(obj: T, ...path: [string, ...string[]]): T {
    foundry.utils.setProperty(obj, unsetFlagPath(...path), null);
    return obj;
}

function deleteFlagProperty<T extends object>(obj: T, ...path: string[]): T {
    foundry.utils.deleteProperty(obj, flagPath(...path));
    return obj;
}

export {
    deleteFlagProperty,
    getFlag,
    getFlagProperty,
    setFlag,
    setFlagProperties,
    setFlagProperty,
    unsetFlag,
    unsetFlagProperty,
};
