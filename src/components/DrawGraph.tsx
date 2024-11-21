export function DrawGraph(ctx: CanvasRenderingContext2D, width: number, height: number, elapsed: number) {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;

    ctx.beginPath();

    const startX = 0;
    const startY = height;
    const minEndY = height * 0.5;
    const growthRate = 25;
    const endY = Math.max(height - (elapsed * growthRate), minEndY);
    const endX = width;

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    ctx.stroke();
}