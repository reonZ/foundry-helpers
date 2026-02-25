import { FileCategory, FilePath, z } from "..";
declare function zFilePath<T extends FilePath>(options: zFilePathOptions | FileCategory[]): z.ZodCustom<T, T>;
type zFilePathOptions = {
    categories?: FileCategory[];
    base64?: boolean;
    virtual?: boolean;
    wildcard?: boolean;
};
export { zFilePath };
export type { zFilePathOptions };
