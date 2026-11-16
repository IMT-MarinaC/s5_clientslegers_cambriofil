import type { SearchParams } from '../api/types';
import type { ClueType } from './clues';

export interface Contract {
    id: string;
    client: string;
    title: string;
    pitch: string;
    difficulty: 'Facile' | 'Moyen' | 'Difficile';
    reward: number;
    search: SearchParams;
    clueTypes: ClueType[];
}

export const CONTRACTS: Contract[] = [
    {
        id: 'comtesse',
        client: 'La Comtesse',
        title: 'Un souvenir d’Égypte',
        pitch: 'Mon salon manque d’exotisme. Rapportez-moi un objet des pharaons.',
        difficulty: 'Facile',
        reward: 50_000,
        search: { q: 'amulet', departmentId: 10 },
        clueTypes: ['medium', 'century'],
    },
    {
        id: 'collectionneur',
        client: 'Le Collectionneur',
        title: 'Une toile signée',
        pitch: 'Je ne collectionne que les grands noms. Ne vous trompez pas de peintre.',
        difficulty: 'Moyen',
        reward: 120_000,
        search: { q: 'portrait', departmentId: 11 },
        clueTypes: ['artist', 'century', 'bulk'],
    },
    {
        id: 'professeure',
        client: 'La Professeure',
        title: 'Un vase antique',
        pitch: 'Pour mes recherches. Officiellement.',
        difficulty: 'Moyen',
        reward: 150_000,
        search: { q: 'vase', departmentId: 13 },
        clueTypes: ['culture', 'classification', 'century'],
    },
    {
        id: 'monsieur-gris',
        client: 'Monsieur Gris',
        title: 'L’arme du chevalier',
        pitch: 'Une lame, une vraie. Discrète, si possible.',
        difficulty: 'Difficile',
        reward: 200_000,
        search: { q: 'sword', departmentId: 4 },
        clueTypes: ['culture', 'medium', 'century', 'bulk'],
    },
];

export const findContract = (id?: string) => CONTRACTS.find((contract) => contract.id === id);