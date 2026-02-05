export {};

declare global {
    type EventType = keyof HTMLElementEventMap;
    type MaybeHTML = Maybe<Document | Element | EventTarget>;

    type WithPartial<T extends Record<string, any>, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
    type WithRequired<T extends Record<string, any>, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
    type PartialExcept<T extends Record<string, any>, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
    type RequiredExcept<T extends Record<string, any>, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;
}
