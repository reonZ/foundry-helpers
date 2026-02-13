import { ActorPF2e, TokenDocumentPF2e } from "pf2e-types";

declare global {
    type Prettify<T> = { [K in keyof T]: T[K] } & {};

    type EventType = keyof HTMLElementEventMap;

    type TargetDocuments = { actor: ActorPF2e; token?: TokenDocumentPF2e | null };

    type MaybeHTML = Maybe<Document | Element | EventTarget>;

    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
        }[Keys];

    type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
        }[Keys];

    type RequiredExcept<T extends Record<string, any>, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

    type PartialExcept<T extends Record<string, any>, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

    type FromPrimitive<T> = T extends string
        ? StringConstructor
        : T extends number
          ? NumberConstructor
          : T extends boolean
            ? BooleanConstructor
            : ConstructorOf<T>;

    type CollapseOf<T extends object> = {
        [Key in keyof T & string]: T[Key] extends object ? `${Key}` | `${Key}.${CollapseOf<T[Key]>}` : `${Key}`;
    }[keyof T & string];

    type Promisable<T> = Promise<T> | T;

    type NonEmptyArray<T> = [T, ...T[]];

    type Point = { x: number; y: number };
}
