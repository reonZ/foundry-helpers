import { ActorPF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e } from "foundry-pf2e";
import { Token } from "foundry-pf2e/foundry/client/canvas/placeables/_module.mjs";
import { TokenDocumentUUID } from "foundry-pf2e/foundry/client/documents/_module.mjs";
declare function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]): void;
declare function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped?: boolean): Point;
declare function getFirstActiveToken(actor: ActorPF2e, { linked, scene }?: FirstActiveTokenOptions): TokenDocumentPF2e | null;
declare function getTargetToken(target: Maybe<TargetDocuments>, options?: FirstActiveTokenOptions): TokenDocumentPF2e | undefined;
type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};
export { getFirstActiveToken, getTargetToken, positionTokenFromCoords, selectTokens };
export type { FirstActiveTokenOptions, Token, TokenDocumentUUID };
