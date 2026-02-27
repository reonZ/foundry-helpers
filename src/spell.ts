import { CreaturePF2e, OneToTen } from "@7h3laughingman/pf2e-types";

function getActorMaxRank(actor: CreaturePF2e): OneToTen {
    return Math.max(1, Math.ceil(actor.level / 2)) as OneToTen;
}

export { getActorMaxRank };
