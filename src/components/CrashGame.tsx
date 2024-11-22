"use client"

import { useState, useRef, useEffect } from "react"
import { GameControls } from "./GameControls"
import { GameGraph } from "./GameGraph"
import { GameHistory } from "./GameHistory"
import { GameFooter } from "./GameFooter"
import { toast } from "@/hooks/use-toast"
import { DrawGraph } from "./DrawGraph"
import { useBalance } from '../context/BalanceContext';
import { useGameStats } from '../context/GameStatsContext';

export function CrashGame() {
  const { balance, setBalance } = useBalance();
  const { winningMultipliers, setWinningMultipliers, winStreak, setWinStreak } = useGameStats();
  const [gameState, setGameState] = useState<"idle" | "playing" | "crashed">("idle")
  const [multiplier, setMultiplier] = useState(1)
  const [betAmount, setBetAmount] = useState(10)
  const [isAuto, setIsAuto] = useState(false)
  const [autoMultiplier, setAutoMultiplier] = useState(2)
  const [history, setHistory] = useState<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()

  const startGame = () => {
    if (gameState !== "idle") return;

    if (betAmount > balance) {
      toast({
        title: "Saldo insuficiente",
        description: "Seu valor de aposta excede seu saldo atual.",
        variant: "destructive",
      });
      return;
    }

    setGameState("playing");
    setBalance(prevBalance => prevBalance - betAmount);
    startTimeRef.current = Date.now();

    const crashPoint = 1.1 + Math.random() * 8.9;

    const animate = () => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const elapsed = (Date.now() - (startTimeRef.current || Date.now())) / 1000;
      const currentMultiplier = Math.pow(1.005, elapsed * 45);

      setMultiplier(currentMultiplier);
      DrawGraph(ctx, canvasRef.current.width, canvasRef.current.height, elapsed);

      if (currentMultiplier >= crashPoint) {
        setGameState("crashed");
        setHistory(prev => [currentMultiplier, ...prev].slice(0, 13));
        toast({
          title: "Jogo Quebrou!",
          description: `O jogo quebrou em ${currentMultiplier.toFixed(2)}x`,
          variant: "destructive",
        });
        setGameState("idle");
        setWinStreak(0);
        return;
      }

      if (isAuto && currentMultiplier >= autoMultiplier) {
        stopGame();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const stopGame = () => {
    if (gameState !== "playing") return;
    setGameState("idle");
    const winAmount = betAmount * multiplier;
    setBalance(prevBalance => prevBalance + winAmount);
    setHistory(prev => [multiplier, ...prev].slice(0, 13));
    setWinningMultipliers(prev => [multiplier, ...prev]);
    setWinStreak(prev => prev + 1);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    toast({
      title: "Saque bem-sucedido!",
      description: `Você ganhou ${winAmount.toFixed(2)} moedas em ${multiplier.toFixed(2)}x`,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#1a1d24] p-4" >
      <div className="max-w-4xl mx-auto" style={{ backgroundImage: "url('wp.png')" }}>
        <div className="grid gap-4 bg-[#1e2328] rounded-lg p-4">
          <div className="grid md:grid-cols-[300px,1fr] gap-4">
            <GameControls
              gameState={gameState}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              isAuto={isAuto}
              setIsAuto={setIsAuto}
              autoMultiplier={autoMultiplier}
              setAutoMultiplier={setAutoMultiplier}
              startGame={startGame}
              stopGame={stopGame}
              balance={balance}
            />
            <GameGraph
              canvasRef={canvasRef}
              multiplier={multiplier}
            />
          </div>
          <GameHistory history={history} winningMultipliers={winningMultipliers} />
          <GameFooter />
        </div>
      </div>
    </div>
  )
}
