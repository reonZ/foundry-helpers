import { ActorPF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e } from "foundry-pf2e";
import { Token as _Token } from "foundry-pf2e/foundry/client/canvas/placeables/_module.mjs";
export declare function selectTokens(tokens: (TokenPF2e | TokenDocumentPF2e)[]): void;
export declare function positionTokenFromCoords({ x, y }: Point, token: TokenPF2e, snapped?: boolean): Point;
export declare function getFirstActiveToken(actor: ActorPF2e, { linked, scene }?: FirstActiveTokenOptions): TokenDocumentPF2e | null;
export declare function getTargetToken(target: Maybe<TargetDocuments>, options?: FirstActiveTokenOptions): TokenDocumentPF2e | undefined;
export type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};
export type Token = _Token;
