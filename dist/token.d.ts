import { ActorPF2e, ActorType, ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "@7h3laughingman/pf2e-types";
import { PingOptions, TokenDocumentUUID } from ".";
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
declare function getFirstActiveToken(actor: ActorPF2e, { linked, scene }?: FirstActiveTokenOptions): TokenDocumentPF2e | null;
declare function getTargetToken(target: Maybe<TargetDocuments>, options?: FirstActiveTokenOptions): TokenDocumentPF2e | undefined;
declare function getTargetsTokens(targets: TargetDocuments[], uuid: true): TokenDocumentUUID[];
declare function getTargetsTokens(targets: TargetDocuments[], uuid?: boolean): TokenDocumentPF2e[];
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
    scene?: ScenePF2e | null;
};
export { emitTokenHover, getCurrentTargets, getFirstActiveToken, getTargetsTokens, getTargetToken, getTokenDocument, panToToken, ping, pingToken, positionTokenFromCoords, selectTokens, };
export type { FirstActiveTokenOptions };
