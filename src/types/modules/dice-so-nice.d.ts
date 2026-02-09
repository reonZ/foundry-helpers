import { CheckRoll } from "foundry-pf2e";
import { Rolled } from "foundry-pf2e/foundry/client/dice/roll.mjs";
import Module from "foundry-pf2e/foundry/client/packages/module.mjs";

declare global {
    class Dice3D {
        showForRoll(
            roll: Roll | Rolled<Roll>,
            user?: User,
            synchronize?: boolean,
            users?: (User | string)[] | null,
            blind?: boolean,
            messageID?: string | null,
            speaker?: foundry.documents.ChatSpeakerData | null,
            options?: { ghost: boolean; secret: boolean },
        ): Promise<boolean>;
    }

    type Dice3DCheckRoll = Rolled<CheckRoll & { ghost?: boolean }>;

    class DiseSoNiceModule extends Module {}
}
