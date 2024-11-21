import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextType {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<number>(1000); // Initial balance

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};