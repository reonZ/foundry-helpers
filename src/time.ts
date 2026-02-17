import { DateTime, HourNumbers, MinuteNumbers, SecondNumbers } from "luxon";

enum TimeChangeMode {
    ADVANCE,
    RETRACT,
}

/**
 * https://github.com/foundryvtt/pf2e/blob/e215ebfbb287190d313fe0441e0362439766786d/src/module/apps/world-clock/time-of-day.ts#L8
 */
class TimeOfDay {
    constructor(
        public readonly hour: HourNumbers,
        public readonly minute: MinuteNumbers,
        public readonly second: SecondNumbers,
    ) {}

    /** Point in morning twilight where dim light begins */
    static DAWN = new TimeOfDay(4, 58, 54);

    static NOON = new TimeOfDay(12, 0, 0);

    /** Point in evening twilight where dim light begins */
    static DUSK = new TimeOfDay(18, 34, 6);

    static MIDNIGHT = new TimeOfDay(0, 0, 0);

    /**
     * Returns positive or negative number of seconds to add to current
     * game time advance function https://foundryvtt.com/api/GameTime.hbs#advance
     * @param worldTime the current time as luxon DateTime
     * @param mode whether to go back to that point in time or to advance
     */
    diffSeconds(worldTime: DateTime, mode: TimeChangeMode): number {
        const targetTime = worldTime.set(this);
        const targetDayDifference = TimeOfDay.diffDays(worldTime, targetTime, mode);
        const targetDay = worldTime.plus({ day: targetDayDifference });

        return targetDay.set(this).diff(worldTime, "seconds").seconds;
    }

    private static diffDays(currentTime: DateTime, targetTime: DateTime, mode: TimeChangeMode): -1 | 0 | 1 {
        // if we have the same point in time, we always want to either skip or rewind a full day
        if (currentTime >= targetTime && mode === TimeChangeMode.ADVANCE) {
            // case: now: 12:01 and advance to 12:00 -> we need to add 1 day to calculate the difference
            return 1;
        } else if (currentTime <= targetTime && mode === TimeChangeMode.RETRACT) {
            // case: now: 12:00 and retract to 12:01 -> we need to subtract 1 day to calculate the difference
            return -1;
        } else {
            return 0;
        }
    }
}

/**
 * slightly modified (also fixed the typo)
 * https://github.com/foundryvtt/pf2e/blob/e215ebfbb287190d313fe0441e0362439766786d/src/module/apps/world-clock/app.ts#L237
 */
function calculateTimeIncrement(interval: string, intervalMode: "+" | "-"): number {
    const worldTime = game.pf2e.worldClock.worldTime;
    const mode = intervalMode === "+" ? TimeChangeMode.ADVANCE : TimeChangeMode.RETRACT;

    switch (interval) {
        case "dawn":
            return TimeOfDay.DAWN.diffSeconds(worldTime, mode);
        case "noon":
            return TimeOfDay.NOON.diffSeconds(worldTime, mode);
        case "dusk":
            return TimeOfDay.DUSK.diffSeconds(worldTime, mode);
        case "midnight":
            return TimeOfDay.MIDNIGHT.diffSeconds(worldTime, mode);
        default: {
            const sign = mode === TimeChangeMode.ADVANCE ? 1 : -1;
            return Number(interval) * sign;
        }
    }
}

function getWorldTime(): number {
    return game.settings.get("core", "time") as number;
}

function waitTimeout(time: number = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

async function advanceTime(interval: TimeInterval, direction: "+" | "-"): Promise<number | undefined> {
    const sign = direction === "+" ? 1 : -1;
    const increment = Number(interval) * sign;

    if (increment !== 0) {
        return game.time.advance(increment);
    }
}

function getShortTime(time: DateTime) {
    return game.pf2e.worldClock.timeConvention === 24
        ? time.toFormat("HH:mm")
        : time.toLocaleString(DateTime.TIME_SIMPLE);
}

function getShortDateTime() {
    const worldClock = game.pf2e.worldClock;
    const worldTime = worldClock.worldTime;
    const time = getShortTime(worldTime);

    const date =
        worldClock.dateTheme === "CE"
            ? worldTime.toLocaleString(DateTime.DATE_SHORT)
            : DateTime.local(worldClock["year"], worldTime.month, worldTime.day).toLocaleString(DateTime.DATE_SHORT);

    return {
        worldClock,
        worldTime,
        time,
        date,
    };
}

function timestampToLocalTime(time: number) {
    return new Date(time).toLocaleString();
}

type TimeInterval = "dawn" | "noon" | "dusk" | "midnight" | `${number}` | number;

export {
    advanceTime,
    calculateTimeIncrement,
    getShortDateTime,
    getShortTime,
    getWorldTime,
    timestampToLocalTime,
    waitTimeout,
};
