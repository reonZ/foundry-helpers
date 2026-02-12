import { DateTime } from "luxon";

export function waitTimeout(time: number = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export function advanceTime(interval: TimeInterval, direction: "+" | "-") {
    const sign = direction === "+" ? 1 : -1;
    const increment = Number(interval) * sign;

    if (increment !== 0) {
        game.time.advance(increment);
    }
}

export function getShortTime(time: DateTime) {
    return game.pf2e.worldClock.timeConvention === 24
        ? time.toFormat("HH:mm")
        : time.toLocaleString(DateTime.TIME_SIMPLE);
}

export function getShortDateTime() {
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

type TimeInterval = "dawn" | "noon" | "dusk" | "midnight" | `${number}` | number;
