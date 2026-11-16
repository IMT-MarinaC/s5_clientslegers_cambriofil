import type { BurglaryRecord } from '../game/history';
import { useLocalStorage } from './useLocalStorage';

const HISTORY_KEY = 'cambriofil:burglaries';

export function useBurglaryHistory() {
    const [burglaries, setBurglaries] = useLocalStorage<BurglaryRecord[]>(HISTORY_KEY, []);

    const addBurglary = (burglary: BurglaryRecord) => setBurglaries((current) => [...current, burglary]);
    const totalLoot = burglaries.reduce((total, burglary) => total + burglary.reward, 0);

    return { burglaries, addBurglary: addBurglary, totalLoot };
}