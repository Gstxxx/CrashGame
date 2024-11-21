export type BetType = 'red' | 'black' | 'white';

export interface GameHistory {
  color: BetType;
  number: number;
  timestamp: number;
}

export interface Bet {
  amount: number;
  type: BetType;
}