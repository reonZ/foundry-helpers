import {
    ActorPF2e,
    CharacterPF2e,
    ChatMessagePF2e,
    EquipmentPF2e,
    ItemPF2e,
    MagicTradition,
    OneToFour,
    PhysicalItemPF2e,
    ResistanceType,
    SpellcastingEntryPF2e,
    SpellSource,
    WeaponPF2e,
    ZeroToTen,
} from "@7h3laughingman/pf2e-types";
import { ItemUUID } from "../../_types";

declare global {
    namespace dailies {
        type ActivationType = "staves" | "servers";
        type ActivationItem = WeaponPF2e<CharacterPF2e> | EquipmentPF2e<CharacterPF2e>;

        type ActivationFlag = {
            staffId: string;
            charges: {
                value: number;
                max: number;
            };
            expended: boolean;
            spells: SpellSource[];
            statistic?: {
                slug: string;
                tradition: MagicTradition;
            };
        };

        type AnimistVesselsData = {
            entry: SpellcastingEntryPF2e<CharacterPF2e>;
            primary: string[];
        };

        interface Api {
            animist: {
                getAnimistConfigs: (actor: CharacterPF2e) => {
                    lores: boolean;
                    spells: boolean;
                    signatures: boolean;
                };
                getAnimistVesselsData: (actor: Maybe<ActorPF2e>) => dailies.AnimistVesselsData | undefined;
            };
            canPrepareDailies: (actor: ActorPF2e) => boolean;
            commander: {
                getCommanderTactics: (actor: ActorPF2e) => string[];
                isTacticAbility: (item: Maybe<ItemPF2e>) => item is ItemPF2e;
            };
            createRetrainBtn: (actor: ActorPF2e, selectedId: string, type: "vessel" | "tactic") => HTMLElement;
            dailyHelpers: {
                createComboSkillDaily: (
                    key: string,
                    uuid: ItemUUID | (() => ItemUUID),
                    { rank, removeRules }?: { rank?: OneToFour | undefined; removeRules?: boolean | undefined },
                ) => object;
                createLanguageDaily: (key: string, uuid: ItemUUID | (() => ItemUUID)) => object;
                createLoreSkillDaily: (key: string, uuid: ItemUUID | (() => ItemUUID)) => object;
                createResistanceDaily: (
                    key: string,
                    uuid: ItemUUID | (() => ItemUUID),
                    resistances: ResistanceType[],
                    resistance: string | number | "half" | "level",
                    isRandom?: boolean,
                ) => object;
                createScrollChainDaily: (
                    key: string,
                    uuids: [ItemUUID | (() => ItemUUID), ItemUUID | (() => ItemUUID), ItemUUID | (() => ItemUUID)],
                ) => object;
            };
            getDailiesSummary: (actor: ActorPF2e) => string;
            getDisabledDailies: (actor: CharacterPF2e) => Record<string, boolean>;
            openDailiesInterface: (actor: ActorPF2e) => Promise<void>;
            registerCustomDailies: (dailies: object[]) => void;
            registerHomebrewEntries: (entries: Record<string, string[]>) => void;
            retrain: (
                actor: ActorPF2e,
                selectedId: string,
                type: "vessel" | "tactic",
            ) => Promise<ChatMessagePF2e | undefined>;
            retrainFromElement: (actor: ActorPF2e, target: HTMLElement) => Promise<ChatMessagePF2e | undefined>;
            spellServers: {
                canCastRank: (actor: CharacterPF2e, rank: ZeroToTen) => boolean | null;
                getData: (actor: CharacterPF2e) => ActivationFlag | undefined;
                getItem: (actor: CharacterPF2e) => PhysicalItemPF2e<CharacterPF2e> | null;
                setChargesValue: (
                    actor: CharacterPF2e,
                    value?: number | undefined,
                ) => Promise<foundry.abstract.Document> | undefined;
            };
            staves: {
                canCastRank: (actor: CharacterPF2e, rank: ZeroToTen) => boolean | null;
                getData: (actor: CharacterPF2e) => ActivationFlag | undefined;
                getItem: (actor: CharacterPF2e) => PhysicalItemPF2e<CharacterPF2e> | null;
                setChargesValue: (
                    actor: CharacterPF2e,
                    value?: number | undefined,
                ) => Promise<foundry.abstract.Document> | undefined;
            };
            utils: Record<string, Function>;
        }
    }
}
