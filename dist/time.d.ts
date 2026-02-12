import { DateTime } from "luxon";
export declare function waitTimeout(time?: number): Promise<void>;
export declare function advanceTime(interval: TimeInterval, direction: "+" | "-"): void;
export declare function getShortTime(time: DateTime): string;
export declare function getShortDateTime(): {
    worldClock: import("foundry-pf2e").WorldClock;
    worldTime: DateTime<boolean>;
    time: string;
    date: string;
};
type TimeInterval = "dawn" | "noon" | "dusk" | "midnight" | `${number}` | number;
export {};
