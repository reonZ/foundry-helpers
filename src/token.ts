import { ActorPF2e, ActorType, ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "@7h3laughingman/pf2e-types";
import { ActivityData, isInstanceOf, PingOptions, R, TokenDocumentUUID } from ".";

function getTokenDocument(token: unknown): TokenDocumentPF2e | undefined {
    return token instanceof foundry.canvas.placeables.Token
        ? token.document
        : token instanceof TokenDocument
          ? (token as TokenDocumentPF2e)
          : undefined;
}

function getCurrentTargets(options?: {
    types?: ("creature" | ActorType)[];
    user?: UserPF2e;
    uuid: true;
}): TokenDocumentUUID[];
function getCurrentTargets(options?: {
    types?: ("creature" | ActorType)[];
    user?: UserPF2e;
    uuid?: boolean;
}): TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[];
function getCurrentTargets({
    types = [],
    user = game.user,
    uuid,
}: { array?: boolean; types?: ("creature" | ActorType)[]; user?: UserPF2e; uuid?: boolean } = {}) {
    const targets = user.targets.filter((target) => {
        const actor = target.actor;
        return !!actor && (!types.length || actor.isOfType(...types));
    });
    return uuid ? Array.from(targets.map((target) => target.document.uuid)) : Array.from(targets);
}

function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]) {
    canvas.tokens.releaseAll();

    for (const target of tokens) {
        const token = target instanceof TokenDocument ? target.object : target;
        token?.control({ releaseOthers: false });
    }
}

function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped = true): Point {
    let position = token.getCenterPoint({ x: 0, y: 0 });

    position.x = x - position.x;
    position.y = y - position.y;

    if (snapped) {
        position = token.getSnappedPosition(position);
    }

    return position;
}

function getFirstActiveToken(
    actor: ActorPF2e,
    { linked, scene }: FirstActiveTokenOptions = {},
): TokenDocumentPF2e | null {
    const predicate = (token: TokenDocument) => !linked || token.actorLink;
    return actor.token ?? getFirstTokenThatMatches(actor, predicate, scene);
}

function getTargetToken(
    target: Maybe<TargetDocuments>,
    options?: FirstActiveTokenOptions,
): TokenDocumentPF2e | undefined {
    if (!target) return undefined;
    return target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined;
}

function getTargetsTokens(targets: TargetDocuments[], uuid: true): TokenDocumentUUID[];
function getTargetsTokens(targets: TargetDocuments[], uuid?: boolean): TokenDocumentPF2e[];
function getTargetsTokens(targets: TargetDocuments[], uuid?: boolean) {
    return R.pipe(
        targets,
        R.map((target) => {
            const token = getTargetToken(target);
            return uuid ? token?.uuid : token;
        }),
        R.filter(R.isTruthy),
    );
}

function getFirstTokenThatMatches<T extends TokenDocument>(
    actor: ActorPF2e,
    predicate: (token: TokenDocument) => boolean,
    scene: Maybe<ScenePF2e> = game.scenes.current,
): T | null {
    if (!scene) return null;

    for (const token of actor._dependentTokens.get(scene) ?? []) {
        if (predicate(token)) {
            return token as T;
        }
    }

    return null;
}

/**
 * slightly modified core foundry version
 */
async function ping(origin: Point, options?: PingOptions & { local?: boolean }): Promise<boolean> {
    const scene = canvas.scene;
    if (!scene) return false;

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

    if (!options?.local) {
        // Broadcast the ping to other connected clients
        const activity: ActivityData = { cursor: origin, ping };
        game.user.broadcastActivity(activity);
    }

    // Display the ping locally
    return canvas.controls.handlePing(game.user, origin, ping);
}

async function pingToken(token: TokenPF2e | TokenDocumentPF2e, local?: boolean): Promise<boolean> {
    if (!canvas.ready) return false;
    return ping(token.center, { local });
}

function emitTokenHover(event: MouseEvent, token: TokenPF2e | TokenDocumentPF2e, hover: boolean) {
    if (!canvas.ready) return;

    const tokenObj = isInstanceOf(token, "TokenPF2e") ? token : token.object;

    if (hover && tokenObj?.isVisible && !tokenObj.controlled) {
        tokenObj.emitHoverIn(event);
    } else if (!hover) {
        tokenObj?.emitHoverOut(event);
    }
}

function panToToken(token: TokenPF2e | TokenDocumentPF2e, control?: boolean) {
    if (control) {
        const tokenObj = isInstanceOf(token, "TokenPF2e") ? token : token.object;
        tokenObj?.control({ releaseOthers: true });
    }

    canvas.animatePan(token.center);
}

type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};

export {
    emitTokenHover,
    getCurrentTargets,
    getFirstActiveToken,
    getTargetsTokens,
    getTargetToken,
    getTokenDocument,
    panToToken,
    ping,
    pingToken,
    positionTokenFromCoords,
    selectTokens,
};
export type { FirstActiveTokenOptions };
