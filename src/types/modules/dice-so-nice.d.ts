import { CheckRoll } from "@7h3laughingman/pf2e-types";
import { ChatSpeakerData, Module, Rolled } from "../../";
import DiceTerm from "@7h3laughingman/foundry-types/client/dice/terms/dice.mjs";

declare global {
    interface Dice3D {
        animateRoll(
            roll: { dice: DiceTerm[] },
            messageData: {
                /** whose roll it is: their dice settings (default: game.user) */
                author?: User | string;
                /** actor/token speaker: hides NPC rolls, uses the character owner's dice */
                speaker?: ChatSpeakerData;
                whisper?: (User | string)[];
                blind?: boolean;
            },
            options?: { messageMode?: "public" | "gm" | "blind" | "self" },
        ): Promise<boolean>;
        showForRoll(
            roll: Roll | Rolled<Roll>,
            user?: User,
            synchronize?: boolean,
            users?: (User | string)[] | null,
            blind?: boolean,
            messageID?: string | null,
            speaker?: ChatSpeakerData | null,
            options?: { ghost: boolean; secret: boolean },
        ): Promise<boolean>;
    }

    type Dice3DCheckRoll = Rolled<CheckRoll & { ghost?: boolean }>;

    class DiseSoNiceModule extends Module {}
}
