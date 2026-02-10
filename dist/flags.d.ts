type Document = foundry.abstract.Document;
export declare function getFlag<T>(doc: Document, ...path: string[]): T | undefined;
export declare function setFlag<D extends Document, T>(doc: D, ...args: [...string[], T]): Promise<D>;
export declare function unsetFlag<D extends Document>(doc: D, ...path: string[]): Promise<D | undefined>;
export {};
