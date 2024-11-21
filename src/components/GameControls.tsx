import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function GameControls({
    gameState,
    betAmount,
    setBetAmount,
    isAuto,
    setIsAuto,
    autoMultiplier,
    setAutoMultiplier,
    startGame,
    stopGame,
    balance
}: {
    gameState: string;
    betAmount: number;
    setBetAmount: (value: number) => void;
    isAuto: boolean;
    setIsAuto: (value: boolean) => void;
    autoMultiplier: number;
    setAutoMultiplier: (value: number) => void;
    startGame: () => void;
    stopGame: () => void;
    balance: number;
}) {
    return (
        <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="grid grid-cols-2 bg-[#12151a] rounded-lg p-1">
                <button
                    onClick={() => setIsAuto(false)}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${!isAuto ? "bg-[#1e2328] text-white" : "text-gray-400"}`}
                >
                    Normal
                </button>
                <button
                    onClick={() => setIsAuto(true)}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${isAuto ? "bg-[#1e2328] text-white" : "text-gray-400"}`}
                >
                    Auto
                </button>
            </div>

            {/* Bet Amount */}
            <div>
                <p className="text-sm text-gray-400">Bet</p>
                <div className="flex gap-4">
                    <div>
                        <Input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(Number(e.target.value))}
                            className="bg-[#12151a] border-0 text-white w-[180px]"
                            placeholder="Quantia R$"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setBetAmount(Math.max(1, Math.floor(betAmount / 2)))}
                            variant="outline"
                            className="bg-transparent text-gray-400 border-gray-400 text-sm rounded-sm hover:bg-transparent hover:text-white"
                        >
                            ½
                        </Button>
                        <Button
                            onClick={() => setBetAmount(Math.min(balance, betAmount * 2))}
                            variant="outline"
                            className="bg-transparent text-gray-400 border-gray-400 text-sm rounded-sm hover:bg-transparent hover:text-white"
                        >
                            2×
                        </Button>
                    </div>
                </div>
            </div>

            {/* Auto Cashout */}
            <div>
                <p className="text-sm text-gray-400">Auto Cashout</p>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={autoMultiplier}
                        onChange={(e) => setAutoMultiplier(Number(e.target.value))}
                        className="bg-[#12151a] border-0 text-white"
                        placeholder="Auto Retirar (Multiplier)"
                    />
                    <Button
                        variant="outline"
                        className="bg-transparent text-gray-400 border-gray-400 text-sm rounded-sm hover:bg-transparent hover:text-white"
                        onClick={() => setAutoMultiplier(2)}
                    >
                        Clear
                    </Button>
                </div>
            </div>

            {/* Start Button */}
            <Button
                onClick={gameState === "playing" ? stopGame : startGame}
                className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white"
                disabled={gameState === "crashed" || betAmount > balance}
            >
                {gameState === "playing" ? "Retirar" : "Começar o jogo"}
            </Button>
        </div>
    )
} 