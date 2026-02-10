export declare function socketOn<T extends object = object>(callback: SocketCallback<T>): void;
export declare function socketOff<T extends object = object>(callback: SocketCallback<T>): void;
export declare function socketEmit<T extends object = object>(packet: T): void;
export declare function displayEmiting(): void;
export declare function createEmitable<T extends Record<string, any>>(prefix: string, callback: (options: T, userId: string) => void | Promise<void>): Emitable<T>;
type Emitable<T> = {
    get enabled(): boolean;
    call: (options: T) => Promise<void>;
    emit: (options: T) => void;
    activate(): void;
    disable(): void;
    toggle(enabled?: boolean): void;
};
export type SocketCallback<T = any> = (packet: T, senderId: string) => void;
export {};
