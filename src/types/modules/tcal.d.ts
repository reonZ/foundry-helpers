import { ActorPF2e } from "@7h3laughingman/pf2e-types";

declare global {
    namespace tcal {
        interface GamePF2e {
            isTransientActor(actor: ActorPF2e): boolean;
        }
    }
}
