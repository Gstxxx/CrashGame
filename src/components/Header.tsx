import { useBalance } from '../context/BalanceContext';

export default function Header() {
    const { balance } = useBalance();
    return (
        <div className="flex justify-between items-center p-4 bg-[#12151a]">
            <h1 className="text-2xl font-bold text-gray-500">Crente bet</h1>
            <p className="text-sm text-gray-400">Balance: R$ {balance.toFixed(2)}</p>
        </div>
    )
}
