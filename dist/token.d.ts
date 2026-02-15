import { ActorPF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e } from "@7h3laughingman/pf2e-types";
declare function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]): void;
declare function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped?: boolean): Point;
declare function getFirstActiveToken(actor: ActorPF2e, { linked, scene }?: FirstActiveTokenOptions): TokenDocumentPF2e | null;
declare function getTargetToken(target: Maybe<TargetDocuments>, options?: FirstActiveTokenOptions): TokenDocumentPF2e | undefined;
type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};
export { getFirstActiveToken, getTargetToken, positionTokenFromCoords, selectTokens };
export type { FirstActiveTokenOptions };
