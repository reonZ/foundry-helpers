import { ActorPF2e, ChatMessageSourcePF2e } from "@7h3laughingman/pf2e-types";
import { RollJSON } from "..";

declare module "@7h3laughingman/pf2e-types" {
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

declare global {
    type ChatMessageData = DeepPartial<Omit<ChatMessageSourcePF2e, "rolls">> & { rolls?: (string | RollJSON)[] };
}
