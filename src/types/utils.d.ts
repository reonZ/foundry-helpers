export {};

declare global {
    type EventType = keyof HTMLElementEventMap;
    type MaybeHTML = Maybe<Document | Element | EventTarget>;

    type PartialExcept<T extends Record<string, any>, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
    type RequiredExcept<T extends Record<string, any>, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

    type Rectangle = {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
