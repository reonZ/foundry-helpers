function selectTokens(tokens) {
    canvas.tokens.releaseAll();
    for (const target of tokens) {
        const token = target instanceof TokenDocument ? target.object : target;
        token?.control({ releaseOthers: false });
    }
}
function positionTokenFromCoords({ x, y }, token, snapped = true) {
    let position = token.getCenterPoint({ x: 0, y: 0 });
    position.x = x - position.x;
    position.y = y - position.y;
    if (snapped) {
        position = token.getSnappedPosition(position);
    }
    return position;
}
function getFirstActiveToken(actor, { linked, scene } = {}) {
    const predicate = (token) => !linked || token.actorLink;
    return actor.token ?? getFirstTokenThatMatches(actor, predicate, scene);
}
function getTargetToken(target, options) {
    if (!target)
        return undefined;
    return target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined;
}
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
export { getFirstActiveToken, getTargetToken, positionTokenFromCoords, selectTokens };
