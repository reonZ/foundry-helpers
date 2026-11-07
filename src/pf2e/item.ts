/**
 * https://github.com/foundryvtt/pf2e/blob/1465f7190b2b8454094c50fa6d06e9902e0a3c41/src/module/item/base/data/values.ts#L23-L31
 */
const ITEM_CARRY_TYPES = Object.freeze([
    "attached",
    "dropped",
    "held",
    "implanted",
    "installed",
    "stowed",
    "worn",
] as const);

/**
 * https://github.com/foundryvtt/pf2e/blob/95e941aecaf1fa6082825b206b0ac02345d10538/src/module/item/physical/values.ts#L1
 */
const PHYSICAL_ITEM_TYPES = new Set([
    "ammo",
    "armor",
    "backpack",
    "book",
    "consumable",
    "equipment",
    "shield",
    "treasure",
    "weapon",
] as const);

export { ITEM_CARRY_TYPES, PHYSICAL_ITEM_TYPES };
