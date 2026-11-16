import { CONTRACTS } from './contracts';
import type { HeistRecord } from './history';
import { cumulativeLoot, scoreByContract, summarizeHeists } from './heistStats';

const makeHeist = (overrides: Partial<HeistRecord>): HeistRecord => ({
    id: '1',
    date: '2026-11-16T10:00:00Z',
    contractId: 'comtesse',
    success: true,
    reward: 50_000,
    callsMade: 0,
    artwork: { objectID: 1, title: 'Amulette', department: 'Egyptian Art', imageUrl: '', value: 1000 },
    ...overrides,
});

const heists = [
    makeHeist({}),
    makeHeist({ success: false, reward: 0, callsMade: 1 }),
    makeHeist({ contractId: 'monsieur-gris', reward: 150_000 }),
];

it('résume les casses', () => {
    expect(summarizeHeists(heists)).toEqual({ count: 3, successRate: 67, totalLoot: 200_000, callsMade: 1 });
});

it('cumule le butin casse après casse', () => {
    expect(cumulativeLoot(heists).map((point) => point.value)).toEqual([50_000, 50_000, 200_000]);
});

it('compte réussites et échecs par contrat, sans les contrats jamais tentés', () => {
    expect(scoreByContract(heists, CONTRACTS)).toEqual([
        { name: 'La Comtesse', succeeded: 1, failed: 1 },
        { name: 'Monsieur Gris', succeeded: 1, failed: 0 },
    ]);
});