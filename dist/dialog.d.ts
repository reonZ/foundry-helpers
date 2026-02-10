export declare function waitDialog<T extends Record<string, any>>({ classes, content, data, expand, i18n, no, onRender, title, yes, }: WaitDialogOptions): Promise<T | false | null>;
export declare function generateDialogContent(content: string, data?: Record<string, any>): Promise<string>;
type BaseDialogOptions = {
    classes?: string[];
    data?: Record<string, any>;
    title?: string | Record<string, any>;
};
export type WaitDialogOptions = BaseDialogOptions & {
    content: string;
    expand?: boolean;
    i18n: string;
    no?: {
        label?: string;
        icon?: string;
        default?: true;
        callback?: foundry.applications.api.DialogV2ButtonCallback;
    };
    onRender?: fa.api.DialogV2RenderCallback;
    yes?: {
        label?: string;
        icon?: string;
        callback?: foundry.applications.api.DialogV2ButtonCallback;
    };
};
export {};
