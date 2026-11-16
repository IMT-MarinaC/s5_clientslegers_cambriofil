import type { MetObject } from '../api/types';
import { shuffle } from '../utils/random';
import { countMatchingClues, createClues, matchesAllClues, type Clue, type ClueType } from './clue.ts';

export const ROOM_SIZE = 6;
const MIN_CLUES = 2;

export interface Mission {
    target: MetObject;
    clues: Clue[];
    candidates: MetObject[];
}

export function buildMission(pool: MetObject[], clueTypes: ClueType[]): Mission | null {
    const withImage = pool.filter((artwork) => artwork.primaryImageSmall);

    for (const target of shuffle(withImage)) {
        const clues = createClues(target, clueTypes);
        if (clues.length < MIN_CLUES) continue;

        const decoys = shuffle(withImage.filter((a) => a.objectID !== target.objectID && !matchesAllClues(a, clues)))
            .sort((a, b) => countMatchingClues(b, clues) - countMatchingClues(a, clues))
            .slice(0, ROOM_SIZE - 1);
        if (decoys.length < ROOM_SIZE - 1) continue;

        return { target, clues, candidates: shuffle([target, ...decoys]) };
    }

    return null; //pas assez d'œuvres exploitables dans ce lot
}