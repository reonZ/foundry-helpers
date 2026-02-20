import z from "zod";
const COINS = ["pp", "gp", "sp", "cp", "credits", "upb"];
const zRawCoins = z
    .record(z.enum(COINS), z.number().min(0).multipleOf(1).default(0))
    .catch({ pp: 0, gp: 0, cp: 0, sp: 0, credits: 0, upb: 0 });
function zCoins() {
    return z.custom((value) => {
        return value instanceof game.pf2e.Coins;
    });
}
export { zCoins };
