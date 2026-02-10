import { MODULE } from "..";

declare module "foundry-pf2e" {
    interface GamePF2e {
        dice3d?: Dice3D;
        hud?: MODULE<hud.Api>;
        toolbelt?: toolbelt.GamePF2e;
    }
}
