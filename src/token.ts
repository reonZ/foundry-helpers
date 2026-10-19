import { ActorType, ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "@7h3laughingman/pf2e-types";
import { isInstanceOf, pan, ping, R, Token, TokenDocumentUUID } from ".";

function isTokenObject<T extends Token = TokenPF2e>(token: any): token is T {
    return token instanceof foundry.canvas.placeables.Token;
}

function getTokenDocument<T extends TokenDocument = TokenDocumentPF2e>(
    token: Maybe<Token | TokenDocument>,
): T | undefined {
    return isTokenObject(token)
        ? (token.document as unknown as T)
        : token instanceof TokenDocument
          ? (token as T)
          : undefined;
}

function getCurrentTargets(options: {
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

function getFirstActiveToken<A extends Actor>(
    actor: A,
    { linked, match = () => true, scene = canvas.scene }: FirstActiveTokenOptions = {},
): TokenDocumentFromActor<A> | null {
    const actorToken = actor.token;
    if (actorToken && match(actorToken)) {
        return actorToken as TokenDocumentFromActor<A>;
    }

    if (!canvas.ready || !scene) return null;

    for (const token of actor.getDependentTokens({ linked, scenes: scene })) {
        if (token === scene.tokens.get(token.id) && match(token)) {
            return token as TokenDocumentFromActor<A>;
        }
    }

    return null;
}

function getTargetToken<A extends Actor>(
    target: Maybe<{ actor: A; token?: TokenDocument | null }>,
    options?: FirstActiveTokenOptions,
): TokenDocumentFromActor<A> | undefined {
    if (!target) return undefined;
    return (target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined) as
        TokenDocumentFromActor<A> | undefined;
}

function getTargetsTokens(
    targets: BaseTargetDocuments[],
    uuid: true,
    options?: FirstActiveTokenOptions,
): TokenDocumentUUID[];
function getTargetsTokens<A extends Actor>(
    targets: { actor: A; token?: TokenDocument | null }[],
    uuid?: boolean,
    options?: FirstActiveTokenOptions,
): TokenDocumentFromActor<A>[];
function getTargetsTokens(targets: BaseTargetDocuments[], uuid?: boolean, options?: FirstActiveTokenOptions) {
    return R.pipe(
        targets,
        R.map((target) => {
            const token = getTargetToken(target, options);
            return uuid ? token?.uuid : token;
        }),
        R.filter(R.isTruthy),
    );
}

async function pingToken(token: Token | TokenDocument, local?: boolean): Promise<boolean> {
    if (!canvas.ready) return false;

    const center = tokenCenter(token);
    return ping(center, { local });
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

function panToToken(
    token: Token | TokenDocument,
    optionsOrControl: boolean | { ping?: boolean; control?: boolean } = {},
): Promise<void> {
    const { control, ping } = R.isBoolean(optionsOrControl)
        ? { control: optionsOrControl, ping: false }
        : optionsOrControl;

    if (control) {
        const tokenObj = isTokenObject<Token>(token) ? token : token.object;
        tokenObj?.control({ releaseOthers: true });
    }

    const center = tokenCenter(token);
    return pan(center, { ping });
}

function tokenCenter(token: Token | TokenDocument) {
    if (isTokenObject(token)) {
        return token.center;
    } else {
        const { x, y } = token.getCenterPoint();
        return new PIXI.Point(x, y);
    }
}

type FirstActiveTokenOptions = {
    linked?: boolean;
    match?: (token: TokenDocument) => boolean;
    scene?: Scene | null;
};

export {
    emitTokenHover,
    getCurrentTargets,
    getFirstActiveToken,
    getTargetsTokens,
    getTargetToken,
    getTokenDocument,
    isTokenObject,
    panToToken,
    pingToken,
    positionTokenFromCoords,
    selectTokens,
    tokenCenter,
};
export type { FirstActiveTokenOptions };
