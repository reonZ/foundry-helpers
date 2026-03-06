import { ItemPF2e } from "@7h3laughingman/pf2e-types";
declare function getChoiceSetSelection<T extends any = string>(item: ItemPF2e, { option, flag }?: {
    option?: string;
    flag?: string;
}): T | undefined;
export { getChoiceSetSelection };
