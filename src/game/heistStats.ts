import { countBy, keepTop, type Slice } from '../utils/aggregate';
import type { Contract } from './contracts';
import type { HeistRecord } from './history';

export interface HeistSummary {
    count: number;
    successRate: number; // en %
    totalLoot: number;
    callsMade: number;
}

export function summarizeHeists(heists: HeistRecord[]): HeistSummary {
    const successes = heists.filter((heist) => heist.success).length;
    return {
        count: heists.length,
        successRate: heists.length > 0 ? Math.round((successes / heists.length) * 100) : 0,
        totalLoot: heists.reduce((total, heist) => total + heist.reward, 0),
        callsMade: heists.reduce((total, heist) => total + heist.callsMade, 0),
    };
}

// Butin cumulé après chaque casse : #1, #2, #3…
export function cumulativeLoot(heists: HeistRecord[]): Slice[] {
    let runningTotal = 0;
    return heists.map((heist, index) => {
        runningTotal += heist.reward;
        return { name: `#${index + 1}`, value: runningTotal };
    });
}

export interface ContractScore {
    name: string;
    succeeded: number;
    failed: number;
}

export function scoreByContract(heist: HeistRecord[], contracts: Contract[]): ContractScore[] {
    return contracts
        .map((contract) => {
            const attempts = heist.filter((heist) => heist.contractId === contract.id);
            const succeeded = attempts.filter((heist) => heist.success).length;
            return { name: contract.client, succeeded, failed: attempts.length - succeeded };
        })
        .filter((score) => score.succeeded + score.failed > 0); // on cache les contrats jamais tentés
}

export const stolenByDepartment = (heists: HeistRecord[]) =>
    keepTop(countBy(heists, (heist) => heist.artwork.department), 6);