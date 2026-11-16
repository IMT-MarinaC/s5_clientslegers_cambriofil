import { makeArtwork } from '../tests/fixtures';
import { estimateBulk, estimateRisk, estimateValue } from './thiefStats';

describe('estimateRisk', () => {
    it('est élevé pour une pièce maîtresse exposée', () => {
        expect(estimateRisk(makeArtwork({ isHighlight: true, GalleryNumber: '12' }))).toBe('Élevé');
    });
    it('est faible pour une œuvre en réserve', () => {
        expect(estimateRisk(makeArtwork())).toBe('Faible');
    });
});

describe('estimateBulk', () => {
    it('classe une statuette de 12 cm dans la poche', () => {
        expect(estimateBulk(makeArtwork())).toBe('Poche');
    });
    it('renvoie Inconnu sans dimensions', () => {
        expect(estimateBulk(makeArtwork({ measurements: null }))).toBe('Inconnu');
    });
    it('demande une camionnette au-delà de 1,5 m', () => {
        const huge = makeArtwork({ measurements: [{ elementName: 'Overall', elementMeasurements: { Width: 300 } }] });
        expect(estimateBulk(huge)).toBe('Camionnette');
    });
});

it('donne plus de valeur à une œuvre plus ancienne', () => {
    expect(estimateValue(makeArtwork({ objectBeginDate: -2000 }))).toBeGreaterThan(
        estimateValue(makeArtwork({ objectBeginDate: 1900 })),
    );
});