import { BalanceProvider } from './context/BalanceContext';
import { GameStatsProvider } from './context/GameStatsContext';
import { CrashGame } from './components/CrashGame';
import Header from './components/Header';

function App() {

  return (
    <div >
      <BalanceProvider>
        <GameStatsProvider>
          <Header />
          <CrashGame />
        </GameStatsProvider>
      </BalanceProvider>
    </div>
  );
}

export default App;