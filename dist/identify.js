import { adjustDCByRarity, calculateDC, MAGIC_TRADITIONS, R, setHasElement, SYSTEM } from ".";
/**
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/item/identification.ts#L30
 */
function getDcRarity(item) {
    return item.traits.has("cursed") ? "unique" : item.rarity;
}
/**
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/item/identification.ts#L63
 * with option fallback
 */
function getItemIdentificationDCs(item, { pwol = false, notMatchingTraditionModifier } = {
    pwol: game.pf2e.settings.variants.pwol.enabled,
    notMatchingTraditionModifier: game.settings.get(SYSTEM.id, "identifyMagicNotMatchingTraditionModifier"),
}) {
    const baseDC = calculateDC(item.level, { pwol });
    const rarity = getDcRarity(item);
    const dc = adjustDCByRarity(baseDC, rarity);
    if (item.isMagical) {
        return getIdentifyMagicDCs(item, dc, notMatchingTraditionModifier);
    }
    else {
        return { crafting: dc };
    }
}
/**
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/item/identification.ts#L22
 */
function getMagicTraditions(item) {
    const traits = item.system.traits.value;
    return new Set(traits.filter((t) => setHasElement(MAGIC_TRADITIONS, t)));
}
/**
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/item/identification.ts#L37
 */
function getIdentifyMagicDCs(item, baseDC, notMatchingTraditionModifier) {
    const result = {
        occult: baseDC,
        primal: baseDC,
        divine: baseDC,
        arcane: baseDC,
    };
    const traditions = getMagicTraditions(item);
    for (const key of MAGIC_TRADITIONS) {
        // once an item has a magic tradition, all skills
        // that don't match the tradition are hard
        if (traditions.size > 0 && !traditions.has(key)) {
            result[key] = baseDC + notMatchingTraditionModifier;
        }
    }
    return { arcana: result.arcane, nature: result.primal, religion: result.divine, occultism: result.occult };
}
/**
 * modified version of
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/actor/sheet/popups/identify-popup.ts#L7
 */
class IdentifyItemPopup extends foundry.appv1.api.FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "identify-item",
            title: game.i18n.localize("PF2E.identification.Identify"),
            template: `systems/${SYSTEM.id}/templates/actors/identify-item.hbs`,
            width: "auto",
            classes: ["identify-popup"],
        };
    }
    dcs = getItemIdentificationDCs(this.object);
    async getData() {
        const item = this.object;
        return {
            ...(await super.getData()),
            isMagic: item.isMagical,
            isAlchemical: item.isAlchemical,
            dcs: this.dcs,
        };
    }
    // we extracted that part from activateListeners so it can be called from third party
    async postSkillChecks() {
        const item = this.object;
        const identifiedName = item.system.identification.identified.name;
        const dcs = this.dcs;
        const action = item.isMagical ? "identify-magic" : item.isAlchemical ? "identify-alchemy" : "recall-knowledge";
        const path = `systems/${SYSTEM.id}/templates/actors/identify-item-chat-skill-checks.hbs`;
        const content = await foundry.applications.handlebars.renderTemplate(path, {
            identifiedName,
            action,
            skills: R.omit(dcs, ["dc"]),
            unidentified: item.system.identification.unidentified,
            uuid: item.uuid,
        });
        await getDocumentClass("ChatMessage").create({ author: game.user.id, content });
    }
    activateListeners($html) {
        const html = $html[0];
        const updateButton = html.querySelector("button.update-identification");
        updateButton?.addEventListener("click", () => {
            this.submit({ updateData: { status: updateButton.value } });
        });
        // Add listener on Post skill checks to chat button that posts item unidentified img and name and skill checks
        html.querySelector("button.post-skill-checks")?.addEventListener("click", async () => {
            await this.postSkillChecks();
        });
    }
    async _updateObject(_event, formData) {
        const status = formData["status"];
        if (status === "identified") {
            return this.object.setIdentificationStatus(status);
        }
    }
}
export { getItemIdentificationDCs, IdentifyItemPopup };
