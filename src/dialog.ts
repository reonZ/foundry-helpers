import { htmlQuery, localize, MODULE, R, render } from ".";

export async function waitDialog<T extends Record<string, any>>({
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
        data.i18n = localize.i18n(i18n);
    }

    classes.push(MODULE.id);

    const dialogOptions: WaitDialogOptions = {
        buttons: [
            {
                action: "yes",
                icon: yes?.icon ?? "fa-solid fa-check",
                label: yes?.label ?? localize(i18n, "yes"),
                default: !no?.default,
                callback: yes?.callback ?? (async (_event, _btn, dialog) => createFormData(dialog.form, expand)),
            },
            {
                action: "no",
                icon: no?.icon ?? "fa-solid fa-xmark",
                label: no?.label ?? localize.ifExist(i18n, "no") ?? "Cancel",
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

function createFormData(html: HTMLFormElement | null, expand: boolean = false): Record<string, unknown> | null {
    const form = html instanceof HTMLFormElement ? html : htmlQuery(html, "form");
    if (!form) return null;

    const formData = new foundry.applications.ux.FormDataExtended(form, { disabled: true, readonly: true });
    const data = R.mapValues(formData.object, (value) => {
        return typeof value === "string" ? value.trim() : value;
    });

    for (const element of form.elements) {
        if (!(element instanceof HTMLInputElement) || element.type !== "file") continue;

        data[element.name] = element.files?.[0];
    }

    return expand ? (foundry.utils.expandObject(data) as Record<string, unknown>) : data;
}

function generateDialogTitle(
    i18n: string,
    title: string | Record<string, any> | undefined,
    data: Record<string, any> | undefined,
): string {
    return R.isString(title) ? title : localize(i18n, "title", R.isObjectType(title) ? title : (data ?? {}));
}

export async function generateDialogContent(content: string, data?: Record<string, any>): Promise<string> {
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

export type CustomWaitDialogOptions = BaseDialogOptions & {
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

type WaitDialogOptions = {
    rejectClose?: boolean;
    close?: fa.api.DialogV2CloseCallback;
    render?: fa.api.DialogV2RenderCallback;
} & DeepPartial<fa.api.DialogV2Configuration>;
