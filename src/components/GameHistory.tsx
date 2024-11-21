import { Badge } from "@/components/ui/badge";

export function GameHistory({ history, winningMultipliers }: { history: number[], winningMultipliers: number[] }) {
    return (
        <div>
            <div className="text-sm text-gray-400 mb-2">ANTERIOR</div>
            <div className="flex gap-2 flex-wrap">
                {history.map((value, i) => (
                    <Badge
                        key={i}
                        variant="secondary"
                        className={`rounded-full px-3 py-1 text-xs font-medium ${winningMultipliers.includes(value)
                                ? "bg-green-500/20 text-green-400"
                                : "bg-[#12151a] text-gray-400"
                            }`}
                    >
                        {value.toFixed(2)}X
                    </Badge>
                ))}
            </div>
        </div>
    );
}