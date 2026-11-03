import { ActivityData, PingOptions, waitTimeout } from ".";

/**
 * slightly modified core foundry version
 */
async function ping(
    origin: Point,
    options: PingOptions & {
        delay?: number;
        instances?: number;
        local?: boolean;
        pull?: boolean;
        style?: ValueOf<typeof CONFIG.Canvas.pings.types>;
        user?: User;
    } = {},
): Promise<boolean> {
    const scene = canvas.scene;
    if (!scene) return false;

    const user = options.user ?? game.user;
    delete options.user;

    // Don't allow pinging outside of the canvas bounds
    if (!canvas.dimensions.rect.contains(origin.x, origin.y)) return false;
    // Configure the ping to be dispatched
    const types = CONFIG.Canvas.pings.types;
    const isPull = game.keyboard.isModifierActive("Shift");
    const isAlert = game.keyboard.isModifierActive("Alt");
    let style: string = types.PULSE;
    if (isPull) style = types.PULL;
    else if (isAlert) style = types.ALERT;
    let ping = { scene: scene.id, pull: isPull, style, zoom: canvas.stage.scale.x };
    ping = foundry.utils.mergeObject(ping, options);

    const delay = Math.clamp(options.delay ?? 250, 100, 2000);
    const instances = Math.clamp(options.instances ?? 1, 1, 10);
    for (let i = instances - 1; i >= 0; i--) {
        if (!options.local) {
            // Broadcast the ping to other connected clients
            const activity: ActivityData = { cursor: origin, ping };
            user.broadcastActivity(activity);
        }

        // Display the ping locally
        canvas.controls.handlePing(user, origin, ping);

        if (i > 0) {
            await waitTimeout(delay);
        }
    }

    return true;
}

function canPing(user: User = game.user) {
    return user.hasPermission("PING_CANVAS");
}

async function pan(point: Point, options?: { ping?: boolean; user?: User }): Promise<void> {
    await canvas.animatePan(point);
    if (options?.ping) {
        ping(point, { local: true, user: options.user });
    }
}

export { canPing, pan, ping };
