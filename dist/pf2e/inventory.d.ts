declare const COIN_DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
declare const COIN_COMPENDIUM_UUIDS: {
    pp: () => foundry.documents.ItemUUID;
    gp: () => foundry.documents.ItemUUID;
    sp: () => foundry.documents.ItemUUID;
    cp: () => foundry.documents.ItemUUID;
};
declare function getPhysicalItemTypes(): ("ammo" | "armor" | "book" | "consumable" | "backpack" | "equipment" | "shield" | "weapon" | "treasure")[];
export { COIN_COMPENDIUM_UUIDS, COIN_DENOMINATIONS, getPhysicalItemTypes };
