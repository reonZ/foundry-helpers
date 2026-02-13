import { ActorPF2e } from "pf2e-types";

declare module "pf2e-types" {
    interface GamePF2e {
        // dice3d?: Dice3D;

        trigger?: {
            test: () => void;
            execute: (actorOrTarget: Maybe<ActorPF2e | TargetDocuments>, values?: unknown[]) => void;
        };

        // hud?: MyModule.GamePF2e<hud.Api>;
        // dailies?: MyModule.GamePF2e<dailies.Api>;
        // tcal?: tcal.GamePF2e;
        toolbelt?: toolbelt.GamePF2e;
    }
}
