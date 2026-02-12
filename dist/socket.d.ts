export declare function socketOn<T extends object = object>(callback: SocketCallback<T>): void;
export declare function socketOff<T extends object = object>(callback: SocketCallback<T>): void;
export declare function socketEmit<T extends object = object>(packet: T): void;
export declare function displayEmiting(): void;
export declare class Emitable<T extends Record<string, any>> {
    #private;
    constructor(prefix: string, callback: (options: T, userId: string) => void | Promise<void>, context?: InstanceType<new (...args: any[]) => any>);
    get enabled(): boolean;
    call(options: T): Promise<void>;
    emit(options: T): void;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
    convertToEmitOptions<T extends EmitableOptions>(options: T): EmitablePacket<T>;
    convertToCallOptions<T extends EmitableOptions>(options: EmitablePacket<T>): Promise<T>;
    convertToCallOption(value: any, __converter__: EmitableConverter): Promise<any>;
    convertTargetFromPacket(target: {
        actor: string;
        token?: string;
    }): Promise<TargetDocuments | undefined>;
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
export {};
