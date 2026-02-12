import { ActorPF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { assignStyle, isValidTargetDocuments, MODULE, R, sharedLocalize, userIsGM } from ".";

const EMITING_STYLE: Partial<CSSStyleDeclaration> = {
    alignItems: "center",
    background: "linear-gradient(90deg, #00000000 0%, #0000001a 20%, #00000066 50%, #0000001a 80%, #00000000 100%)",
    color: "#efe6d8c9",
    display: "flex",
    fontSize: "4em",
    gap: "0.3em",
    justifyContent: "center",
    left: "0",
    paddingBlock: "0.1em",
    position: "absolute",
    right: "0",
    textShadow: "#000000 0px 0px 6px",
    top: "10%",
    zIndex: "2147483647",
};

export function socketOn<T extends object = object>(callback: SocketCallback<T>) {
    game.socket.on(`module.${MODULE.id}`, callback);
}

export function socketOff<T extends object = object>(callback: SocketCallback<T>) {
    game.socket.off(`module.${MODULE.id}`, callback);
}

export function socketEmit<T extends object = object>(packet: T) {
    game.socket.emit(`module.${MODULE.id}`, packet);
}

let _emitingElement: HTMLElement;
export function displayEmiting() {
    const emitingElement = (_emitingElement ??= (() => {
        const label = sharedLocalize("emiting.label");
        const el = document.createElement("div");

        el.innerHTML = `${label}<i class="fa-solid fa-wifi"></i>`;
        assignStyle(el, EMITING_STYLE);

        return el;
    })());

    document.body.append(emitingElement);

    setTimeout(() => {
        emitingElement.remove();
    }, 600);
}

export class Emitable<T extends Record<string, any>> {
    #callback: (options: T, userId: string) => void | Promise<void>;
    #enabled: boolean = false;
    #onSocket: (packet: EmitablePacket<T>, userId: string) => Promise<void>;
    #prefix: string;

    constructor(
        prefix: string,
        callback: (options: T, userId: string) => void | Promise<void>,
        context?: InstanceType<new (...args: any[]) => any>,
    ) {
        this.#callback = context ? callback.bind(context) : callback;
        this.#prefix = prefix;

        this.#onSocket = async (packet: EmitablePacket<T>, userId: string) => {
            if (packet.__type__ !== prefix || !game.user.isActiveGM) return;

            const callOptions = await this.convertToCallOptions(packet);
            callback(callOptions, userId);
        };
    }

    get enabled(): boolean {
        return this.#enabled;
    }

    async call(options: T): Promise<void> {
        if (!R.isPlainObject(options)) return;

        if (game.user.isActiveGM) {
            return this.#callback(options, game.userId);
        } else {
            this.emit(options);
        }
    }

    emit(options: T) {
        if (!game.users.activeGM) {
            const msg = sharedLocalize("emiting.noGm");
            ui.notifications.error(msg);
            return;
        }

        displayEmiting();

        const packet = this.convertToEmitOptions(options);
        packet.__type__ = this.#prefix;

        socketEmit(packet);
    }

    activate() {
        if (this.enabled || !userIsGM()) return;
        this.#enabled = true;
        socketOn(this.#onSocket);
    }

    disable() {
        if (!this.enabled) return;
        this.#enabled = false;
        socketOff(this.#onSocket);
    }

    toggle(enabled: boolean = !this.enabled) {
        if (enabled) {
            this.activate();
        } else {
            this.disable();
        }
    }

    convertToEmitOptions<T extends EmitableOptions>(options: T): EmitablePacket<T> {
        const __converter__: EmitableConverters = {};

        const convertedOptions = R.mapValues(options as EmitableOptions, (value, key): unknown => {
            if (value instanceof foundry.abstract.Document) {
                __converter__[key] = "document";
                return value.uuid;
            }

            if (value instanceof foundry.canvas.placeables.Token) {
                __converter__[key] = "token";
                return value.document.uuid;
            }

            if (isValidTargetDocuments(value)) {
                __converter__[key] = "target";

                return {
                    actor: value.actor.uuid,
                    token: value.token?.uuid,
                };
            }

            return value;
        }) as EmitablePacket<T>;

        convertedOptions.__converter__ = __converter__;
        convertedOptions.__source__ = R.isArray(options) ? "array" : "object";

        return convertedOptions;
    }

    async convertToCallOptions<T extends EmitableOptions>(options: EmitablePacket<T>): Promise<T> {
        const __converter__ = options.__converter__;
        const __source__ = options.__source__;

        // @ts-expect-error
        delete options.__converter__;
        // @ts-expect-error
        delete options.__source__;
        // @ts-expect-error
        delete options.__type__;

        await Promise.all(R.entries(options).map(async () => {}));

        const converted = (__source__ === "array" ? [] : {}) as T;

        await Promise.all(
            R.entries(options).map(async ([key, value]) => {
                converted[key as keyof typeof converted] = await this.convertToCallOption(value, __converter__[key]);
            }),
        );

        return converted;
    }

    async convertToCallOption(value: any, __converter__: EmitableConverter): Promise<any> {
        switch (__converter__) {
            case "document": {
                return fromUuid(value);
            }
            case "target": {
                return this.convertTargetFromPacket(value);
            }
            case "token": {
                const tokenDocument = await fromUuid<TokenDocumentPF2e>(value);
                return tokenDocument?.object;
            }
            default: {
                return value;
            }
        }
    }

    async convertTargetFromPacket(target: { actor: string; token?: string }): Promise<TargetDocuments | undefined> {
        const actor = await fromUuid<ActorPF2e>(target.actor);
        if (!(actor instanceof Actor)) return;

        return {
            actor,
            token: (target.token && (await fromUuid<TokenDocumentPF2e>(target.token))) || undefined,
        };
    }
}

type EmitablePacket<T extends EmitableOptions> = EmitablePacketOptions<T> & {
    __type__: string;
    __converter__: EmitableConverters;
    __source__: "array" | "object";
};

type EmitableConverter = "document" | "target" | "token" | undefined;

type EmitableConverters = Record<string, EmitableConverter>;

type EmitableOptions = Record<string, any> | any[];

type EmitablePacketOptions<T extends EmitableOptions> = T extends Array<infer V> ? Record<string, V> : T;
export type SocketCallback<T = any> = (packet: T, senderId: string) => void;
