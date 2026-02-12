import { AbstractEffectPF2e, ActorPF2e, ArithmeticExpression, ChatMessagePF2e, ConsumablePF2e, CreatureConfig, CreaturePF2e, DamageRoll, EffectPF2e, FeatPF2e, Grouping, ItemPF2e, LootPF2e, MacroPF2e, SpellcastingEntryPF2e, SpellPF2e, TokenDocumentPF2e, TokenPF2e, WeaponPF2e } from "foundry-pf2e";
export declare class MapOfArrays<K extends string | number, T> extends Map<K, T[]> {
    constructor(entries?: readonly (readonly [K, T[]])[] | Iterable<readonly [K, T[]]> | Record<K, T[]> | null);
    add(key: K, entry: T | T[], create?: boolean): void;
    get(key: K, create: true): T[];
    get(key: K, create?: boolean): T[] | undefined;
    remove(key: K, entry: T): T | null;
    removeBy(key: K, fn: (entry: T) => boolean): T | null;
    map<U>(fn: (value: T[], key: K, index: number, data: this) => U): U[];
    toObject(): Record<K, T[]>;
    toJSON(): Record<K, T[]>;
}
export declare function isInstanceOf<T extends keyof IsInstanceOfClasses>(obj: any, cls: T): obj is IsInstanceOfClasses[T];
export declare function isInstanceOf<T>(obj: any, cls: string): obj is T;
type IsInstanceOfClasses = IsInstanceOfItems & {
    ActorPF2e: ActorPF2e;
    ArithmeticExpression: ArithmeticExpression;
    ChatMessagePF2e: ChatMessagePF2e;
    ClientDocumentMixin: ClientDocument;
    CreatureConfig: CreatureConfig<CreaturePF2e>;
    DamageRoll: DamageRoll;
    Grouping: Grouping;
    LootPF2e: LootPF2e;
    MacroPF2e: MacroPF2e;
    TokenPF2e: TokenPF2e;
    TokenDocumentPF2e: TokenDocumentPF2e;
};
type IsInstanceOfItems = {
    AbstractEffectPF2e: AbstractEffectPF2e;
    ConsumablePF2e: ConsumablePF2e;
    EffectPF2e: EffectPF2e;
    FeatPF2e: FeatPF2e;
    ItemPF2e: ItemPF2e;
    SpellcastingEntryPF2e: SpellcastingEntryPF2e;
    SpellPF2e: SpellPF2e;
    WeaponPF2e: WeaponPF2e;
};
export {};
