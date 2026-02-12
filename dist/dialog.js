import { createFormData, htmlQuery, localize, localizeIfExist, MODULE, R, render, templateLocalize } from ".";
async function waitDialog({ classes = [], content, data, expand, i18n, no, onRender, title, yes, }) {
    if (data) {
        data.i18n = templateLocalize(i18n);
    }
    classes.push(MODULE.id);
    const dialogOptions = {
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
    return foundry.applications.api.DialogV2.wait(dialogOptions);
}
async function confirmDialog(i18n, { classes = [], content, data = {}, no, title, yes } = {}) {
    const dialogOptions = {
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
    return foundry.applications.api.DialogV2.confirm(dialogOptions);
}
function generateDialogTitle(i18n, title, data) {
    return R.isString(title) ? title : localize(i18n, "title", R.isObjectType(title) ? title : (data ?? {}));
}
async function generateDialogContent(content, data) {
    if (R.isObjectType(data)) {
        return render(content, data);
    }
    else {
        return content.startsWith("<") ? content : `<div>${content}</div>`;
    }
}
export { confirmDialog, generateDialogContent, waitDialog };
