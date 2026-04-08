import { AttributeString, MagicTradition, OneToTen } from "@7h3laughingman/pf2e-types";
import z from "zod";
import { R } from "..";

const _cached: { attributes?: AttributeString[]; traditions?: MagicTradition[] } = {};

function zAttribute() {
    const attribute = (_cached.attributes ??= R.keys(CONFIG.PF2E.abilities));
    return z.enum(attribute);
}

function zTradition() {
    const traditions = (_cached.traditions ??= R.keys(CONFIG.PF2E.magicTraditions));
    return z.enum(traditions);
}

function zSpellRank(): z.ZodCustom<OneToTen, OneToTen> {
    return z.custom((value) => {
        return R.isNumber(value) && value >= 1 && value <= 10;
    });
}

export { zAttribute, zSpellRank, zTradition };
