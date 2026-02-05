export function distanceToPoint(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
}
export function subtractPoint(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}
export function addPoints(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}
export function multiplyPointBy(point, value) {
    return {
        x: point.x * value,
        y: point.y * value,
    };
}
export function dividePointBy(point, value) {
    return {
        x: point.x / value,
        y: point.y / value,
    };
}
export function dividePoints(a, b) {
    return {
        x: a.x / b.x,
        y: a.y / b.y,
    };
}
export function addToPoint({ x, y }, value) {
    return {
        x: x + value,
        y: y + value,
    };
}
export function calculateMidPoint(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    };
}
export function drawRectangleMask(x, y, width, height, radius) {
    const mask = new PIXI.Graphics();
    mask.beginFill(0x555555);
    if (radius) {
        mask.drawRoundedRect(x, y, width, height, radius);
    }
    else {
        mask.drawRect(x, y, width, height);
    }
    mask.endFill();
    return mask;
}
export function drawCircleMask(x, y, radius) {
    const mask = new PIXI.Graphics();
    mask.beginFill(0x555555);
    mask.drawCircle(x, y, radius);
    mask.endFill();
    return mask;
}
export function drawPolygonMask(...path) {
    const mask = new PIXI.Graphics();
    mask.lineStyle(0);
    mask.beginFill(0x555555);
    for (const [x, y] of path) {
        mask.lineTo(x, y);
    }
    mask.endFill();
    return mask;
}
