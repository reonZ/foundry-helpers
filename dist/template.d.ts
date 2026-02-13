import { MeasuredTemplateDocumentPF2e, MeasuredTemplatePF2e, TokenPF2e } from "pf2e-types";
declare function getTemplateTokens(measuredTemplate: MeasuredTemplateDocumentPF2e | MeasuredTemplatePF2e, { collisionOrigin, collisionType }?: {
    collisionOrigin?: PIXI.Point;
    collisionType?: "move";
}): TokenPF2e<import("pf2e-types").TokenDocumentPF2e<import("pf2e-types").ScenePF2e | null>>[];
export { getTemplateTokens };
