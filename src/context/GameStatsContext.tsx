import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface GameStatsContextType {
    winningMultipliers: number[];
    setWinningMultipliers: React.Dispatch<React.SetStateAction<number[]>>;
    winStreak: number;
    setWinStreak: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const GameStatsContext = createContext<GameStatsContextType | undefined>(undefined);

// Create a provider component
export const GameStatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [winningMultipliers, setWinningMultipliers] = useState<number[]>([]);
    const [winStreak, setWinStreak] = useState<number>(0);

    return (
        <GameStatsContext.Provider value={{ winningMultipliers, setWinningMultipliers, winStreak, setWinStreak }}>
            {children}
        </GameStatsContext.Provider>
    );
};

// Custom hook to use the game stats context
export const useGameStats = () => {
    const context = useContext(GameStatsContext);
    if (!context) {
        throw new Error('useGameStats must be used within a GameStatsProvider');
    }
    return context;
}; 