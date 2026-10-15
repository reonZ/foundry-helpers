import { ActorType, ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "@7h3laughingman/pf2e-types";
import { PingOptions, TokenDocumentUUID } from ".";
declare function isTokenObject(token: any): token is TokenPF2e;
declare function getTokenDocument(token: unknown): TokenDocumentPF2e | undefined;
declare function getCurrentTargets(options: {
    types?: ("creature" | ActorType)[];
    user?: UserPF2e;
    uuid: true;
}): TokenDocumentUUID[];
declare function getCurrentTargets(options?: {
    types?: ("creature" | ActorType)[];
    user?: UserPF2e;
    uuid?: boolean;
}): TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[];
declare function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]): void;
declare function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped?: boolean): Point;
declare function getFirstActiveToken<A extends Actor>(actor: A, { linked, match, scene }?: FirstActiveTokenOptions): TokenDocumentFromActor<A> | null;
declare function getTargetToken<A extends Actor>(target: Maybe<{
    actor: A;
    token?: TokenDocument | null;
}>, options?: FirstActiveTokenOptions): TokenDocumentFromActor<A> | undefined;
declare function getTargetsTokens(targets: BaseTargetDocuments[], uuid: true, options?: FirstActiveTokenOptions): TokenDocumentUUID[];
declare function getTargetsTokens<A extends Actor>(targets: {
    actor: A;
    token?: TokenDocument | null;
}[], uuid?: boolean, options?: FirstActiveTokenOptions): TokenDocumentFromActor<A>[];
/**
 * slightly modified core foundry version
 */
declare function ping(origin: Point, options?: PingOptions & {
    local?: boolean;
}): Promise<boolean>;
declare function pingToken(token: TokenPF2e | TokenDocumentPF2e, local?: boolean): Promise<boolean>;
declare function emitTokenHover(event: MouseEvent, token: TokenPF2e | TokenDocumentPF2e, hover: boolean): void;
declare function panToToken(token: TokenPF2e | TokenDocumentPF2e, control?: boolean): void;
type FirstActiveTokenOptions = {
    linked?: boolean;
    match?: (token: TokenDocument) => boolean;
    scene?: Scene | null;
};
export { emitTokenHover, getCurrentTargets, getFirstActiveToken, getTargetsTokens, getTargetToken, getTokenDocument, isTokenObject, panToToken, ping, pingToken, positionTokenFromCoords, selectTokens, };
export type { FirstActiveTokenOptions };
