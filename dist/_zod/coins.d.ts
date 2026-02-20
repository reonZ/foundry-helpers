import { Coins } from "@7h3laughingman/pf2e-types";
import z from "zod";
declare function zCoins(): z.ZodCustom<Coins, Coins>;
export { zCoins };
