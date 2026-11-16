import type { HeistRecord } from '../game/history';
import { useLocalStorage } from './useLocalStorage';
import {summarizeHeists} from "../game/heistStats.ts";

const HISTORY_KEY = 'cambriofil:heists';

export function useHeistHistory() {
    const [heists, setHeists] = useLocalStorage<HeistRecord[]>(HISTORY_KEY, []);

    const addHeist = (heist: HeistRecord) => setHeists((current) => [...current, heist]);
    const { totalLoot } = summarizeHeists(heists);

    return { heists: heists, addHeist: addHeist, totalLoot };
}