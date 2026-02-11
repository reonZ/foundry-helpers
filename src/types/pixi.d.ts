export {};

declare global {
    type TextStyleFontWeight = PIXI.ITextStyle["fontWeight"];

    type FederatedEvent = PIXI.FederatedPointerEvent & {
        interactionData: Record<string, any>;
    };
}
