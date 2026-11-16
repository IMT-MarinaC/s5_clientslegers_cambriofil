import type { MetObject } from '../api/types';

export function makeArtwork(overrides: Partial<MetObject> = {}): MetObject {
    return {
        objectID: 1,
        isHighlight: false,
        primaryImage: 'https://images.test/1.jpg',
        primaryImageSmall: 'https://images.test/1-small.jpg',
        department: 'Egyptian Art',
        objectName: 'Statuette',
        title: 'Statuette de chat',
        culture: 'Egyptian',
        period: 'Late Period',
        objectDate: 'ca. 600 B.C.',
        objectBeginDate: -600,
        objectEndDate: -500,
        medium: 'Bronze',
        dimensions: 'H. 12 cm',
        measurements: [{ elementName: 'Overall', elementMeasurements: { Height: 12 } }],
        artistDisplayName: '',
        artistDisplayBio: '',
        classification: 'Sculpture',
        GalleryNumber: '',
        objectURL: 'https://www.metmuseum.org/art/collection/search/1',
        creditLine: '',
        ...overrides,
    };
}

export const DETAIL_ARTWORK = makeArtwork({
    objectID: 2,
    title: 'Épée de chevalier',
    department: 'Arms and Armor',
    culture: 'German',
    classification: 'Swords',
    medium: 'Steel, gold',
    objectBeginDate: 1500,
    isHighlight: true,
    GalleryNumber: '371',
});

// 8 œuvres toutes différentes : assez pour générer une mission de 6, quel que soit le contrat
export const MISSION_POOL = Array.from({ length: 8 }, (_, i) =>
    makeArtwork({
        objectID: 100 + i,
        title: `Pièce ${i}`,
        culture: `Culture ${i}`,
        classification: `Type ${i}`,
        medium: `Matière ${i}`,
        artistDisplayName: `Artiste ${i}`,
        objectBeginDate: -2000 + i * 300,
        measurements: [{ elementName: 'Overall', elementMeasurements: { Height: 10 + i * 30 } }],
    }),
);

export const DEPARTMENTS = [
    { departmentId: 10, displayName: 'Egyptian Art' },
    { departmentId: 4, displayName: 'Arms and Armor' },
];