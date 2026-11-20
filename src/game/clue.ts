import type { MetObject } from '../api/types';
import { estimateBulk } from '../utils/thiefStats';
import { formatCentury, getCentury } from '../utils/format';

export type ClueType = 'culture' | 'classification' | 'century' | 'artist' | 'medium' | 'bulk';

export interface Clue {
    type: ClueType;
    value: string;
    text: string;
}

interface ClueRule {
    read: (artwork: MetObject) => string;
    phrase: (value: string) => string;
}

const CLUE_RULES: Record<ClueType, ClueRule> = {
    culture: { read: (a) => a.culture, phrase: (v) => `de culture « ${v} »` },
    classification: { read: (a) => a.classification, phrase: (v) => `classée « ${v} »` },
    century: { read: (a) => formatCentury(getCentury(a.objectBeginDate)), phrase: (v) => `créée au ${v}` },
    artist: { read: (a) => a.artistDisplayName, phrase: (v) => `signée ${v}` },
    medium: { read: (a) => a.medium.split(/[;,\r\n]/)[0], phrase: (v) => `en « ${v} »` },
    bulk: {
        read: (a) => (estimateBulk(a) === 'Inconnu' ? '' : estimateBulk(a)),
        phrase: (v) => `qui tient dans : ${v}`,
    },
};

const readClueValue = (type: ClueType, artwork: MetObject) => CLUE_RULES[type].read(artwork).trim();

//ignore les critères vides (l'API renvoie souvent "" pour culture ou classification)
export function createClues(target: MetObject, types: ClueType[]): Clue[] {
    return types
        .map((type) => ({ type, value: readClueValue(type, target) }))
        .filter((clue) => clue.value !== '')
        .map((clue) => ({ ...clue, text: CLUE_RULES[clue.type].phrase(clue.value) }));
}

//Critères que l'œuvre ne respecte pas : sert au verdict, à l'écran de résultat et à la planque
export function getFailedClues(artwork: MetObject, clues: Clue[]): Clue[] {
    return clues.filter((clue) => readClueValue(clue.type, artwork) !== clue.value);
}

export const countMatchingClues = (artwork: MetObject, clues: Clue[]) =>
    clues.length - getFailedClues(artwork, clues).length;

export const matchesAllClues = (artwork: MetObject, clues: Clue[]) => getFailedClues(artwork, clues).length === 0;