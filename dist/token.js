import { isInstanceOf, ping, R } from ".";
function isTokenObject(token) {
    return token instanceof foundry.canvas.placeables.Token;
}
function getTokenDocument(token) {
    return isTokenObject(token)
        ? token.document
        : token instanceof TokenDocument
            ? token
            : undefined;
}
function getCurrentTargets({ types = [], user = game.user, uuid, } = {}) {
    const targets = user.targets.filter((target) => {
        const actor = target.actor;
        return !!actor && (!types.length || actor.isOfType(...types));
    });
    return uuid ? Array.from(targets.map((target) => target.document.uuid)) : Array.from(targets);
}
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
function getFirstActiveToken(actor, { linked, match = () => true, scene = canvas.scene } = {}) {
    const actorToken = actor.token;
    if (actorToken && match(actorToken)) {
        return actorToken;
    }
    if (!canvas.ready || !scene)
        return null;
    for (const token of actor.getDependentTokens({ linked, scenes: scene })) {
        if (token === scene.tokens.get(token.id) && match(token)) {
            return token;
        }
    }
    return null;
}
function getTargetToken(target, options) {
    if (!target)
        return undefined;
    return (target.token ?? target.actor.token ?? getFirstActiveToken(target.actor, options) ?? undefined);
}
function getTargetsTokens(targets, uuid, options) {
    return R.pipe(targets, R.map((target) => {
        const token = getTargetToken(target, options);
        return uuid ? token?.uuid : token;
    }), R.filter(R.isTruthy));
}
async function pingToken(token, local) {
    if (!canvas.ready)
        return false;
    const center = tokenCenter(token);
    return ping(center, { local });
}
function emitTokenHover(event, token, hover) {
    if (!canvas.ready)
        return;
    const tokenObj = isInstanceOf(token, "TokenPF2e") ? token : token.object;
    if (hover && tokenObj?.isVisible && !tokenObj.controlled) {
        tokenObj.emitHoverIn(event);
    }
    else if (!hover) {
        tokenObj?.emitHoverOut(event);
    }
}
function panToToken(token, control) {
    if (control) {
        const tokenObj = isTokenObject(token) ? token : token.object;
        tokenObj?.control({ releaseOthers: true });
    }
    const center = tokenCenter(token);
    canvas.animatePan(center);
}
function tokenCenter(token) {
    if (isTokenObject(token)) {
        return token.center;
    }
    else {
        const { x, y } = token.getCenterPoint();
        return new PIXI.Point(x, y);
    }
}
export { emitTokenHover, getCurrentTargets, getFirstActiveToken, getTargetsTokens, getTargetToken, getTokenDocument, isTokenObject, panToToken, pingToken, positionTokenFromCoords, selectTokens, tokenCenter, };
