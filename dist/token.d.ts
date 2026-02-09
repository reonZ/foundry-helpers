import { ActorPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
export declare function getFirstActiveToken(actor: ActorPF2e, { linked, scene }?: FirstActiveTokenOptions): TokenDocumentPF2e | null;
export declare function getTargetToken(target: Maybe<TargetDocuments>, options?: FirstActiveTokenOptions): TokenDocumentPF2e | undefined;
export type FirstActiveTokenOptions = {
    linked?: boolean;
    scene?: ScenePF2e | null;
};
