import { createFormData, htmlQuery, localize, localizeIfExist, MODULE, R, render, templateLocalize } from ".";

async function waitDialog<T extends Record<string, any>>({
    classes = [],
    content,
    data,
    expand,
    i18n,
    no,
    onRender,
    title,
    yes,
}: CustomWaitDialogOptions): Promise<T | false | null> {
    if (data) {
        data.i18n = templateLocalize(i18n);
    }

    classes.push(MODULE.id);

    const dialogOptions: WaitDialogOptions = {
        buttons: [
            {
                action: "yes",
                icon: yes?.icon ?? "fa-solid fa-check",
                label: yes?.label ?? localize(i18n, "yes"),
                default: !no?.default,
                callback: yes?.callback ?? (async (_event, _btn, dialog) => createFormData(dialog.element, expand)),
            },
            {
                action: "no",
                icon: no?.icon ?? "fa-solid fa-xmark",
                label: no?.label ?? localizeIfExist(i18n, "no") ?? "Cancel",
                default: !!no?.default,
                callback: no?.callback ?? (() => false),
            },
        ],
        classes,
        content: await generateDialogContent(content, data),
        render: (event, dialog) => {
            requestAnimationFrame(() => {
                htmlQuery(dialog.element, `input[type="text"]`)?.focus();
            });

            if (onRender) {
                onRender(event, dialog);
            }
        },
        window: {
            title: generateDialogTitle(i18n, title, data),
        },
    };

    return foundry.applications.api.DialogV2.wait(dialogOptions) as Promise<T | false | null>;
}

async function confirmDialog(
    i18n: string,
    { classes = [], content, data = {}, no, title, yes }: CustomConfirmDialogOptions = {},
): Promise<boolean | null> {
    const dialogOptions: ConfirmDialogOption = {
        classes,
        content: content ?? localizeIfExist(i18n, "content", data) ?? (await generateDialogContent(i18n, data)),
        no: {
            default: !yes?.default,
            label: no ?? localizeIfExist(i18n, "no") ?? "No",
        },
        window: {
            title: generateDialogTitle(i18n, title, data),
        },
        yes: {
            default: !!yes?.default,
            label: yes?.label ?? localizeIfExist(i18n, "yes") ?? "Yes",
        },
    };

    return foundry.applications.api.DialogV2.confirm(dialogOptions) as Promise<boolean | null>;
}

function generateDialogTitle(
    i18n: string,
    title: string | Record<string, any> | undefined,
    data: Record<string, any> | undefined,
): string {
    return R.isString(title) ? title : localize(i18n, "title", R.isObjectType(title) ? title : (data ?? {}));
}

async function generateDialogContent(content: string, data?: Record<string, any>): Promise<string> {
    if (R.isObjectType(data)) {
        return render(content, data);
    } else {
        return content.startsWith("<") ? content : `<div>${content}</div>`;
    }
}

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
    yes?: {
        label?: string;
        icon?: string;
        callback?: fa.api.DialogV2ButtonCallback;
    };
};

type CustomConfirmDialogOptions = BaseDialogOptions & {
    content?: string;
    no?: string;
    yes?: { label?: string; default?: true };
};

type WaitDialogOptions = DeepPartial<fa.api.DialogV2Configuration> & {
    rejectClose?: boolean;
    close?: fa.api.DialogV2CloseCallback;
    render?: fa.api.DialogV2RenderCallback;
};

type ConfirmDialogOption = DeepPartial<fa.api.DialogV2Configuration & fa.api.DialogV2WaitOptions> & {
    yes?: Partial<fa.api.DialogV2Button>;
    no?: Partial<fa.api.DialogV2Button>;
};

export { confirmDialog, generateDialogContent, waitDialog };
export type { CustomWaitDialogOptions };
