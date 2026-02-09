export {};

declare global {
    type EventType = keyof HTMLElementEventMap;
    type MaybeHTML = Maybe<Document | Element | EventTarget>;

    type PartialExcept<T extends Record<string, any>, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
    type RequiredExcept<T extends Record<string, any>, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;
    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];
    type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];

    type Rectangle = {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
