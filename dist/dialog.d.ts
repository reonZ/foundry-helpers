declare function waitDialog<T extends Record<string, any>>({ classes, content, data, expand, i18n, no, onRender, position, title, yes, }: CustomWaitDialogOptions): Promise<T | false | null>;
declare function confirmDialog(i18n: string, { classes, content, data, no, title, yes }?: CustomConfirmDialogOptions): Promise<boolean | null>;
declare function generateDialogContent(content: string, data?: Record<string, any>): Promise<string>;
type BaseDialogOptions = {
    classes?: string[];
    data?: Record<string, any>;
    title?: string | Record<string, any>;
};
type CustomWaitDialogOptions = BaseDialogOptions & {
    content: string;
    expand?: boolean;
    i18n: string;
    no?: {
        label?: string;
        icon?: string;
        default?: true;
        callback?: fa.api.DialogV2ButtonCallback;
    };
    onRender?: fa.api.DialogV2RenderCallback;
    position?: Partial<fa.ApplicationPosition>;
    yes?: {
        label?: string;
        icon?: string;
        callback?: fa.api.DialogV2ButtonCallback;
    };
};
type CustomConfirmDialogOptions = BaseDialogOptions & {
    content?: string;
    no?: string;
    yes?: {
        label?: string;
        default?: true;
    };
};
export { confirmDialog, generateDialogContent, waitDialog };
export type { CustomWaitDialogOptions };
