import { DateTime } from "luxon";
/**
 * slightly modified (also fixed the typo)
 * https://github.com/foundryvtt/pf2e/blob/e215ebfbb287190d313fe0441e0362439766786d/src/module/apps/world-clock/app.ts#L237
 */
declare function calculateTimeIncrement(interval: string, intervalMode: "+" | "-"): number;
declare function getWorldTime(): number;
declare function waitTimeout(time?: number): Promise<void>;
declare function advanceTime(interval: TimeInterval, direction: "+" | "-"): Promise<number | undefined>;
declare function getShortTime(time: DateTime): string;
declare function getShortDateTime(): {
    worldClock: import("@7h3laughingman/pf2e-types").WorldClock;
    worldTime: DateTime<boolean>;
    time: string;
    date: string;
};
declare function timestampToLocalTime(time: number): string;
type TimeInterval = "dawn" | "noon" | "dusk" | "midnight" | `${number}` | number;
export { advanceTime, calculateTimeIncrement, getShortDateTime, getShortTime, getWorldTime, timestampToLocalTime, waitTimeout, };
