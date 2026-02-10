import { ActorPF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e } from "foundry-pf2e";
import { Token as _Token } from "foundry-pf2e/foundry/client/canvas/placeables/_module.mjs";

export function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]) {
    canvas.tokens.releaseAll();

    for (const target of tokens) {
        const token = target instanceof TokenDocument ? target.object : target;
        token?.control({ releaseOthers: false });
    }
}

export function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped = true): Point {
    let position = token.getCenterPoint({ x: 0, y: 0 });

    position.x = x - position.x;
    position.y = y - position.y;

    if (snapped) {
        position = token.getSnappedPosition(position);
    }

    return position;
}

export function getFirstActiveToken(
    actor: ActorPF2e,
    { linked, scene }: FirstActiveTokenOptions = {},
): TokenDocumentPF2e | null {
    const predicate = (token: TokenDocument) => !linked || token.actorLink;
    return actor.token ?? getFirstTokenThatMatches(actor, predicate, scene);
}

export function getTargetToken(
    target: Maybe<TargetDocuments>,
    options?: FirstActiveTokenOptions,
): TokenDocumentPF2e | undefined {
    if (!target) return undefined;
    return target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined;
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

export type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};

export type Token = _Token;
