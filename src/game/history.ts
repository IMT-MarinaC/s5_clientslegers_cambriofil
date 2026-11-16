import type { MetObject } from '../api/types';
import { estimateValue } from '../utils/thiefStats';
import type { Clue } from './clue';

//Résumé de l'oeuvre
export interface StolenArtwork {
    objectID: number;
    title: string;
    department: string;
    imageUrl: string;
    value: number;
}

export interface HeistRecord {
    id: string;
    date: string;
    contractId: string;
    success: boolean;
    reward: number; //0 si raté
    callsMade: number;
    missedClue?: string; //1er critère raté, affiché sur les invendables
    artwork: StolenArtwork;
}

interface HeistInput {
    contractId: string;
    artwork: MetObject;
    reward: number;
    callsMade: number;
    failedClues: Clue[];
}

export function createHeistRecord({ contractId, artwork, reward, callsMade, failedClues }: HeistInput): HeistRecord {
    const success = failedClues.length === 0;
    return {
        id: `${Date.now()}-${artwork.objectID}`,
        date: new Date().toISOString(),
        contractId,
        success,
        reward: success ? reward : 0,
        callsMade,
        missedClue: failedClues[0]?.text,
        artwork: {
            objectID: artwork.objectID,
            title: artwork.title || 'Sans titre',
            department: artwork.department || 'Inconnu',
            imageUrl: artwork.primaryImageSmall,
            value: estimateValue(artwork),
        },
    };
}