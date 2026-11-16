export const FREE_NOTES = 1; //critères déjà notés dans le carnet au départ
export const CALL_PENALTY = 0.25;

export function computeReward(baseReward: number, callsMade: number): number {
    return Math.round(baseReward * Math.max(0, 1 - callsMade * CALL_PENALTY));
}