import Module from "foundry-pf2e/foundry/client/packages/module.mjs";

declare module "foundry-pf2e" {
    interface GamePF2e {
        dice3d?: Dice3D;
        hud?: Module & { api: hud.Api };
    }
}
