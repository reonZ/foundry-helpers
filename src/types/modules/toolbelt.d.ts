import {
    AbilityItemPF2e,
    ActorPF2e,
    CharacterPF2e,
    ChatMessagePF2e,
    CheckRoll,
    CreaturePF2e,
    DegreeAdjustmentsRecord,
    DegreeOfSuccessString,
    FeatPF2e,
    ItemPF2e,
    MacroPF2e,
    NPCPF2e,
    PhysicalItemPF2e,
    RawCoins,
    RollNoteSource,
    RuleElement,
    RuleElementSchema,
    SaveType,
    TokenDocumentPF2e,
} from "@7h3laughingman/pf2e-types";
import { ActorUUID, DocumentUUID, ItemUUID, Rolled, RollJSON, TokenDocumentUUID } from "../../_types";

declare global {
    namespace toolbelt {
        interface GamePF2e extends MyModule.GamePF2e<Api> {
            getToolSetting<K extends keyof Settings, S extends keyof Settings[K]>(tool: K, setting: S): Settings[K][S];
        }

        interface Settings {
            actionable: {
                action: boolean;
                apply: boolean;
                item: boolean;
                physical: boolean;
                spell: boolean;
                use: boolean;
            };
            anonymous: {
                action: boolean;
                spell: boolean;
                traits: "disabled" | "all" | "blacklist";
            };
            betterTrade: {
                invertTrade: boolean;
            };
            heroActions: {
                enabled: boolean;
            };
            identify: {
                enabled: boolean;
                playerRequest: boolean;
            };
            targetHelper: {
                checks: boolean;
                enabled: boolean;
                small: boolean;
                targets: boolean;
            };
        }

        interface Api {
            actionable: {
                getActionMacro: (action: AbilityItemPF2e | FeatPF2e) => Promise<Maybe<MacroPF2e>>;
                getItemMacro: (item: ItemPF2e) => Promise<Maybe<MacroPF2e>>;
                getVirtualAction(data: actionable.ActionableData): Promise<AbilityItemPF2e | null>;
                getVirtualActionsData(actor: ActorPF2e): Record<string, actionable.VirtualActionData>;
                useAction(
                    event: Event,
                    item: AbilityItemPF2e<ActorPF2e> | FeatPF2e<ActorPF2e>,
                    virtualData?: actionable.VirtualActionData,
                ): Promise<unknown>;
            };
            betterInventory: {
                mergeItems: (actor: ActorPF2e, btn?: HTMLButtonElement | HTMLAnchorElement) => Promise<void>;
                splitItem: (item: Maybe<ItemPF2e>) => Promise<void>;
            };
            betterMerchant: {
                testItemsForMerchant: (merchant: ActorPF2e, items: ItemPF2e[]) => betterMerchant.TestItemData[];
            };
            heroActions: {
                canTrade: () => boolean;
                discardHeroActions: (actor: CharacterPF2e, uuids: string[] | string) => void;
                drawHeroActions: (actor: CharacterPF2e) => Promise<void>;
                getDeckTable: () => Promise<RollTable | undefined>;
                getHeroActionDetails: (uuid: string) => Promise<heroActions.HeroActionDetails | undefined>;
                getHeroActions: (actor: CharacterPF2e) => heroActions.HeroAction[];
                getHeroActionsTemplateData: (actor: CharacterPF2e) => heroActions.HeroActionsTemplateData | undefined;
                giveHeroActions: (actor: CharacterPF2e) => Promise<void>;
                removeHeroActions: () => Promise<void>;
                sendActionToChat: (actor: CharacterPF2e, uuid: string) => Promise<void>;
                tradeHeroAction: (actor: CharacterPF2e) => Promise<void>;
                useHeroAction: (actor: CharacterPF2e, uuid: string) => Promise<void>;
                usesCountVariant: () => boolean;
            };
            identify: {
                openTracker: (item?: ItemPF2e) => void;
                requestIdentify: (item: Maybe<ItemPF2e>, skipNotify?: boolean) => void;
            };
            mergeDamage: {
                injectDamageMessage: (
                    targetMessage: ChatMessagePF2e,
                    originMessage: ChatMessagePF2e,
                    options?: { updateMessages?: boolean },
                ) => Promise<{ rolls: RollJSON[] } | undefined>;
                mergeDamageMessages: (
                    targetMessage: ChatMessagePF2e,
                    originMessage: ChatMessagePF2e,
                    options?: { updateMessages?: boolean },
                ) => Promise<ChatMessagePF2e | undefined>;
            };
            shareData: {
                getMasterInMemory: (actor: CreaturePF2e) => CreaturePF2e | undefined;
                getSlavesInMemory(actor: CreaturePF2e, idOnly: false): CreaturePF2e[];
                getSlavesInMemory(actor: CreaturePF2e, idOnly?: true): Set<ActorUUID> | undefined;
            };
            targetHelper: {
                getMessageTargets: (message: ChatMessagePF2e) => TokenDocumentPF2e[] | undefined;
                setMessageFlagTargets: <T extends Record<string, unknown>>(
                    updates: T,
                    targets: TokenDocumentUUID[],
                ) => T;
            };
        }

        namespace actionable {
            type ActionableData = {
                frequency?: number;
                id: string;
                sourceId: ItemUUID;
            };

            type VirtualActionData = {
                data: ActionableData;
                parent: PhysicalItemPF2e<CharacterPF2e>;
                ruleIndex: number;
            };

            type ActionableSchema = RuleElementSchema & {
                data: foundry.data.fields.ObjectField<ActionableData>;
                uuid: foundry.data.fields.StringField<ItemUUID, ItemUUID, true, false, false>;
            };

            type ActionableUpdateDataArgs = {
                frequency?: number;
            };

            type ActionableRuleElement = RuleElement & {
                updateData(changes: ActionableUpdateDataArgs, sourceOnly: true): EmbeddedDocumentUpdateData | undefined;
                updateData(
                    changes: ActionableUpdateDataArgs,
                    sourceOnly?: boolean,
                ): Promise<ItemPF2e<CharacterPF2e>[]> | undefined;
                updateData(
                    changes: ActionableUpdateDataArgs,
                    sourceOnly?: boolean,
                ): EmbeddedDocumentUpdateData | Promise<ItemPF2e<CharacterPF2e>[]> | undefined;
            };
        }

        namespace betterMerchant {
            type TestItemData = {
                buyPrice: RawCoins;
                item: PhysicalItemPF2e<CharacterPF2e | NPCPF2e>;
            };
        }

        namespace heroActions {
            type HeroAction = {
                uuid: DocumentUUID;
                name: string;
            };

            type HeroActionDetails = {
                name: string;
                description: string;
            };

            type HeroActionsTemplateData = {
                actions: HeroAction[];
                usesCount: boolean;
                mustDiscard: boolean;
                mustDraw: boolean;
                canUse: boolean;
                canTrade: boolean | 0;
                diff: number;
            };
        }

        namespace targetHelper {
            type RerollType = "hero" | "mythic" | "new" | "lower" | "higher";
            type TargetMessageType = "area" | "damage" | "spell" | "action" | "check";

            type TargetSaveInstance = {
                die: number;
                dosAdjustments?: DegreeAdjustmentsRecord | undefined;
                modifiers: { label: string; modifier: number; slug: string }[];
                notes: RollNoteSource[];
                private: boolean;
                rerolled?: RerollType;
                roll: string;
                significantModifiers?: modifiersMatter.SignificantModifier[] | undefined;
                statistic: SaveType;
                success: DegreeOfSuccessString;
                unadjustedOutcome?: DegreeOfSuccessString | null;
                value: number;
            };

            type TargetsSaves = {
                basic: boolean;
                dc: number;
                saves?: Record<string, TargetSaveInstance>;
                statistic: SaveType;
            };

            type MessageFlag = {
                author?: ActorUUID;
                applied?: Record<string, AppliedDamages>;
                isRegen?: boolean;
                item?: ItemUUID;
                options?: string[];
                private?: boolean;
                saveVariants?: Record<string, TargetsSaves>;
                splashIndex?: number;
                splashTargets?: string[];
                targets?: TokenDocumentUUID[];
                traits?: string[];
                type?: TargetMessageType;
            };

            type AppliedDamages = Record<`${number}` | number, boolean>;

            type RollSaveHook = {
                roll: Rolled<CheckRoll>;
                message: ChatMessagePF2e;
                rollMessage: ChatMessagePF2e;
                target: TokenDocumentPF2e;
                data: TargetSaveInstance;
            };

            type RerollSaveHook = {
                oldRoll: Rolled<CheckRoll>;
                newRoll: Rolled<CheckRoll>;
                keptRoll: Rolled<CheckRoll>;
                message: ChatMessagePF2e;
                target: TokenDocumentPF2e;
                data: TargetSaveInstance;
            };
        }
    }
}
