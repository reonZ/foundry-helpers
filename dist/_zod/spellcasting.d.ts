import { OneToTen } from "@7h3laughingman/pf2e-types";
import z from "zod";
declare function zAttribute(): z.ZodEnum<{
    str: "str";
    dex: "dex";
    con: "con";
    int: "int";
    wis: "wis";
    cha: "cha";
}>;
declare function zTradition(): z.ZodEnum<{
    arcane: "arcane";
    divine: "divine";
    occult: "occult";
    primal: "primal";
}>;
declare function zSpellRank(): z.ZodCustom<OneToTen, OneToTen>;
export { zAttribute, zSpellRank, zTradition };
