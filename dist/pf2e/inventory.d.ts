declare const COIN_DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
declare const COIN_COMPENDIUM_UUIDS: {
    pp: () => foundry.documents.ItemUUID;
    gp: () => foundry.documents.ItemUUID;
    sp: () => foundry.documents.ItemUUID;
    cp: () => foundry.documents.ItemUUID;
};
declare function getPhysicalItemTypes(): ("armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon")[];
export { COIN_COMPENDIUM_UUIDS, COIN_DENOMINATIONS, getPhysicalItemTypes };
