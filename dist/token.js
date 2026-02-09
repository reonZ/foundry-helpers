function getFirstTokenThatMatches(actor, predicate, scene = game.scenes.current) {
    if (!scene)
        return null;
    for (const token of actor._dependentTokens.get(scene) ?? []) {
        if (predicate(token)) {
            return token;
        }
    }
    return null;
}
export function getFirstActiveToken(actor, { linked, scene } = {}) {
    const predicate = (token) => !linked || token.actorLink;
    return actor.token ?? getFirstTokenThatMatches(actor, predicate, scene);
}
export function getTargetToken(target, options) {
    if (!target)
        return undefined;
    return target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined;
}
