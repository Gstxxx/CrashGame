import { useEffect, useRef } from 'react';
import { DrawGraph } from './DrawGraph';

export function GameGraph({ canvasRef, multiplier }: { canvasRef: React.RefObject<HTMLCanvasElement>, multiplier: number }) {
    const elapsedRef = useRef<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            elapsedRef.current += 1;
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    const width = canvasRef.current.width;
                    const height = canvasRef.current.height;
                    DrawGraph(ctx, width, height, elapsedRef.current);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [canvasRef]);

    return (
        <div className="relative aspect-[2/1] bg-[#12151a] rounded-lg overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ width: "100%", height: "100%" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#1e2328]/90 px-6 py-3 rounded-lg">
                    <span className="text-4xl font-bold text-white">
                        {multiplier.toFixed(2)}X
                    </span>
                </div>
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-500">Online</span>
            </div>
        </div>
    );
}