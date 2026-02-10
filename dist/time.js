export function waitTimeout(time = 1) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
