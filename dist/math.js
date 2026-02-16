function roundToStep(value, step) {
    step = value < 0 ? step * -1 : step;
    const half = step / 2;
    return value + half - ((value + half) % step);
}
export { roundToStep };
