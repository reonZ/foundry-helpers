export {};

declare global {
    type ColorSource = PIXI.ColorSource;

    type TextStyleFontWeight = PIXI.ITextStyle["fontWeight"];

    type PreciseText = foundry.canvas.containers.PreciseText;

    type FederatedEvent = PIXI.FederatedPointerEvent & {
        interactionData: Record<string, any>;
    };
}
