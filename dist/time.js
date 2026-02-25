import { DateTime } from "luxon";
import { R } from ".";
var TimeChangeMode;
(function (TimeChangeMode) {
    TimeChangeMode[TimeChangeMode["ADVANCE"] = 0] = "ADVANCE";
    TimeChangeMode[TimeChangeMode["RETRACT"] = 1] = "RETRACT";
})(TimeChangeMode || (TimeChangeMode = {}));
/**
 * https://github.com/foundryvtt/pf2e/blob/e215ebfbb287190d313fe0441e0362439766786d/src/module/apps/world-clock/time-of-day.ts#L8
 */
class TimeOfDay {
    hour;
    minute;
    second;
    constructor(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
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
    diffSeconds(worldTime, mode) {
        const targetTime = worldTime.set(this);
        const targetDayDifference = TimeOfDay.diffDays(worldTime, targetTime, mode);
        const targetDay = worldTime.plus({ day: targetDayDifference });
        return targetDay.set(this).diff(worldTime, "seconds").seconds;
    }
    static diffDays(currentTime, targetTime, mode) {
        // if we have the same point in time, we always want to either skip or rewind a full day
        if (currentTime >= targetTime && mode === TimeChangeMode.ADVANCE) {
            // case: now: 12:01 and advance to 12:00 -> we need to add 1 day to calculate the difference
            return 1;
        }
        else if (currentTime <= targetTime && mode === TimeChangeMode.RETRACT) {
            // case: now: 12:00 and retract to 12:01 -> we need to subtract 1 day to calculate the difference
            return -1;
        }
        else {
            return 0;
        }
    }
}
function createTimeout(callback, options) {
    let timeoutId = null;
    const usedOptions = R.isNumber(options) ? { defaultDelay: options } : options;
    const minDelay = Math.max(usedOptions?.minDelay ?? 0, 0);
    const defaultDelay = Math.max(usedOptions?.defaultDelay ?? 1, minDelay);
    return {
        start(...args) {
            if (timeoutId !== null) {
                this.stop();
            }
            if (defaultDelay < 1) {
                callback(...args);
            }
            else {
                timeoutId = setTimeout(callback, defaultDelay, ...args);
            }
        },
        startWithDelay(delay, ...args) {
            if (timeoutId !== null) {
                this.stop();
            }
            const usedDelay = Math.max(delay, minDelay);
            if (usedDelay < 1) {
                callback(...args);
            }
            else {
                timeoutId = setTimeout(callback, usedDelay, ...args);
            }
        },
        stop() {
            if (timeoutId === null)
                return;
            clearTimeout(timeoutId);
            timeoutId = null;
        },
    };
}
/**
 * slightly modified (also fixed the typo)
 * https://github.com/foundryvtt/pf2e/blob/e215ebfbb287190d313fe0441e0362439766786d/src/module/apps/world-clock/app.ts#L237
 */
function calculateTimeIncrement(interval, intervalMode) {
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
function getWorldTime() {
    return game.settings.get("core", "time");
}
function getTimeWithSeconds(time) {
    return game.pf2e.worldClock.timeConvention === 24
        ? time.toFormat("HH:mm:ss")
        : time.toLocaleString(DateTime.TIME_WITH_SECONDS);
}
function waitTimeout(time = 1) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
async function advanceTime(interval, direction) {
    const sign = direction === "+" ? 1 : -1;
    const increment = Number(interval) * sign;
    if (increment !== 0) {
        return game.time.advance(increment);
    }
}
function getShortTime(time) {
    return game.pf2e.worldClock.timeConvention === 24
        ? time.toFormat("HH:mm")
        : time.toLocaleString(DateTime.TIME_SIMPLE);
}
function getShortDateTime() {
    const worldClock = game.pf2e.worldClock;
    const worldTime = worldClock.worldTime;
    const time = getShortTime(worldTime);
    const date = worldClock.dateTheme === "CE"
        ? worldTime.toLocaleString(DateTime.DATE_SHORT)
        : DateTime.local(worldClock["year"], worldTime.month, worldTime.day).toLocaleString(DateTime.DATE_SHORT);
    return {
        worldClock,
        worldTime,
        time,
        date,
    };
}
function timestampToLocalTime(time) {
    return new Date(time).toLocaleString();
}
export { advanceTime, calculateTimeIncrement, createTimeout, getShortDateTime, getShortTime, getTimeWithSeconds, getWorldTime, timestampToLocalTime, waitTimeout, };
