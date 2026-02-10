import { MeasuredTemplateDocumentPF2e, MeasuredTemplatePF2e, TokenPF2e } from "foundry-pf2e";
export declare function getTemplateTokens(measuredTemplate: MeasuredTemplateDocumentPF2e | MeasuredTemplatePF2e, { collisionOrigin, collisionType }?: {
    collisionOrigin?: PIXI.Point;
    collisionType?: "move";
}): TokenPF2e<import("foundry-pf2e").TokenDocumentPF2e<import("foundry-pf2e").ScenePF2e | null>>[];
