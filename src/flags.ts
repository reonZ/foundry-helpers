import { ClientDocument, DatabaseUpdateOperation, MODULE, R } from ".";

type Document = foundry.abstract.Document;

function flagPath(...path: string[]): string {
    return `flags.${MODULE.path(...path)}`;
}

function unsetFlagPath(...path: [string, ...string[]]): string {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}

function getFlag<T>(doc: Document, ...path: string[]): T | undefined {
    return doc.getFlag(MODULE.id, R.join(path, ".")) as T | undefined;
}

function setFlag<D extends Document, T>(doc: D, ...args: [...string[], T]): Promise<D> {
    const value = args.pop();
    return doc.setFlag(MODULE.id, R.join(args as string[], "."), value);
}

function unsetFlag<D extends Document>(doc: D, ...path: string[]): Promise<D | undefined> {
    return doc.unsetFlag(MODULE.id, R.join(path, "."));
}

function updateFlag<T extends Record<string, unknown>, D extends foundry.abstract.Document>(
    doc: D,
    updates: T,
    operation?: Partial<DatabaseUpdateOperation<D>>,
) {
    return doc.update({ flags: { [MODULE.id]: updates } }, operation);
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

function updateSourceFlag<T extends ClientDocument>(doc: T, ...args: [...string[], any]): DeepPartial<T["_source"]> {
    const value = args.pop();
    return doc.updateSource({ [flagPath(...args)]: value });
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
    updateFlag,
    updateSourceFlag,
};
