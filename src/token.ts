import { ActorPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";

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

export type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};
