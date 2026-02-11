import { htmlQuery, localize, MODULE, R, render } from ".";
export async function waitDialog({ classes = [], content, data, expand, i18n, no, onRender, title, yes, }) {
    if (data) {
        data.i18n = localize.i18n(i18n);
    }
    classes.push(MODULE.id);
    const yesCallback = yes?.callback ?? (async (event, btn, dialog) => createFormData(dialog.form, expand));
    const dialogOptions = {
        buttons: [
            {
                action: "yes",
                icon: yes?.icon ?? "fa-solid fa-check",
                label: yes?.label ?? localize(i18n, "yes"),
                default: !no?.default,
                callback: yesCallback,
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
        window: {
            title: generateDialogTitle(i18n, title, data),
        },
        render: (event, dialog) => {
            requestAnimationFrame(() => {
                htmlQuery(dialog.element, `input[type="text"]`)?.focus();
            });
            if (onRender) {
                onRender(event, dialog);
            }
        },
    };
    return foundry.applications.api.DialogV2.wait(dialogOptions);
}
function createFormData(html, expand = false) {
    const form = html instanceof HTMLFormElement ? html : htmlQuery(html, "form");
    if (!form)
        return null;
    const formData = new foundry.applications.ux.FormDataExtended(form, { disabled: true, readonly: true });
    const data = R.mapValues(formData.object, (value) => {
        return typeof value === "string" ? value.trim() : value;
    });
    for (const element of form.elements) {
        if (!(element instanceof HTMLInputElement) || element.type !== "file")
            continue;
        data[element.name] = element.files?.[0];
    }
    return expand ? foundry.utils.expandObject(data) : data;
}
function generateDialogTitle(i18n, title, data) {
    return R.isString(title) ? title : localize(i18n, "title", R.isObjectType(title) ? title : (data ?? {}));
}
export async function generateDialogContent(content, data) {
    if (R.isObjectType(data)) {
        return render(content, data);
    }
    else {
        return content.startsWith("<") ? content : `<div>${content}</div>`;
    }
}
