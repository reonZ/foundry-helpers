declare const COIN_DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
declare const COIN_COMPENDIUM_UUIDS: {
    pp: () => "Compendium.pf2e.equipment-srd.Item.JuNPeK5Qm1w6wpb4";
    gp: () => "Compendium.pf2e.equipment-srd.Item.B6B7tBWJSqOBz5zz";
    sp: () => "Compendium.pf2e.equipment-srd.Item.5Ew82vBF9YfaiY9f";
    cp: () => "Compendium.pf2e.equipment-srd.Item.lzJ8AVhRcbFul5fh";
};
declare function getPhysicalItemTypes(): ("equipment" | "consumable" | "ammo" | "armor" | "book" | "backpack" | "shield" | "weapon" | "treasure")[];
export { COIN_COMPENDIUM_UUIDS, COIN_DENOMINATIONS, getPhysicalItemTypes };
