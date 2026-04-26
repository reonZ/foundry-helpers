import { ItemPF2e, PhysicalItemType } from "@7h3laughingman/pf2e-types";
import { R, SYSTEM } from "..";

const COIN_DENOMINATIONS = ["pp", "gp", "sp", "cp"] as const;

const COIN_COMPENDIUM_UUIDS = {
    pp: SYSTEM.itemUuid(
        "Compendium.pf2e.equipment-srd.Item.JuNPeK5Qm1w6wpb4",
        "Compendium.pf2e-anachronism.equipment.Item.JuNPeK5Qm1w6wpb4",
    ),
    gp: SYSTEM.itemUuid(
        "Compendium.pf2e.equipment-srd.Item.B6B7tBWJSqOBz5zz",
        "Compendium.pf2e-anachronism.equipment.Item.B6B7tBWJSqOBz5zz",
    ),
    sp: SYSTEM.itemUuid(
        "Compendium.pf2e.equipment-srd.Item.5Ew82vBF9YfaiY9f",
        "Compendium.pf2e-anachronism.equipment.Item.5Ew82vBF9YfaiY9f",
    ),
    cp: SYSTEM.itemUuid(
        "Compendium.pf2e.equipment-srd.Item.lzJ8AVhRcbFul5fh",
        "Compendium.pf2e-anachronism.equipment.Item.lzJ8AVhRcbFul5fh",
    ),
};

let _physicalItemTypes: PhysicalItemType[] | undefined;
function getPhysicalItemTypes() {
    return (_physicalItemTypes ??= R.pipe(
        R.entries(CONFIG.PF2E.Item.documentClasses),
        R.filter(([_, x]) => (Reflect.getPrototypeOf(x) as typeof ItemPF2e).name === "PhysicalItemPF2e"),
        R.map(([type]) => type as PhysicalItemType),
    ));
}

export { COIN_COMPENDIUM_UUIDS, COIN_DENOMINATIONS, getPhysicalItemTypes };
