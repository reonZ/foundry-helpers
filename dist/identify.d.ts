import { DCOptions, IdentifyAlchemyDCs, IdentifyMagicDCs, PhysicalItemPF2e } from "@7h3laughingman/pf2e-types";
/**
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/item/identification.ts#L63
 * with option fallback
 */
declare function getItemIdentificationDCs(item: PhysicalItemPF2e, { pwol, notMatchingTraditionModifier }?: IdentifyItemOptions): IdentifyMagicDCs | IdentifyAlchemyDCs;
/**
 * modified version of
 * https://github.com/foundryvtt/pf2e/blob/578620c2a35a76d904938fb3d4984ad0e14be241/src/module/actor/sheet/popups/identify-popup.ts#L7
 */
declare class IdentifyItemPopup extends foundry.appv1.api.FormApplication<PhysicalItemPF2e> {
    static get defaultOptions(): foundry.appv1.api.FormApplicationOptions;
    dcs: IdentifyMagicDCs | IdentifyAlchemyDCs;
    getData(): Promise<IdentifyPopupData>;
    postSkillChecks(): Promise<void>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface IdentifyPopupData extends foundry.appv1.api.FormApplicationData {
    isMagic: boolean;
    isAlchemical: boolean;
    dcs: IdentifyMagicDCs | IdentifyAlchemyDCs;
}
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
export { getItemIdentificationDCs, IdentifyItemPopup };
