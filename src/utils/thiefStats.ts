import type { MetObject } from '../api/types';

export type Bulk = 'Poche' | 'Sac à dos' | 'Diable' | 'Camionnette' | 'Inconnu';
export type Risk = 'Faible' | 'Moyen' | 'Élevé';

const REFERENCE_YEAR = 2026;
const BASE_VALUE = 10_000;
const HIGHLIGHT_FACTOR = 5;
const SIGNED_FACTOR = 2;

//Valeurs fictives :
// +1x par siècle d'âge
// x5 si pièce maîtresse
// x2 si signée
export function estimateValue(artwork: MetObject): number {
    const age = Math.max(0, REFERENCE_YEAR - artwork.objectBeginDate);
    const ageFactor = 1 + age / 100;
    const highlightFactor = artwork.isHighlight ? HIGHLIGHT_FACTOR : 1;
    const signedFactor = artwork.artistDisplayName ? SIGNED_FACTOR : 1;
    return Math.round(BASE_VALUE * ageFactor * highlightFactor * signedFactor);
}

function getMaxDimensionCm(artwork: MetObject): number | null {
    const sizes = artwork.measurements?.[0]?.elementMeasurements;
    if (!sizes) return null;
    const values = [sizes.Height, sizes.Width, sizes.Depth, sizes.Diameter].filter(
        (value): value is number => typeof value === 'number',
    );
    return values.length > 0 ? Math.max(...values) : null;
}

export function estimateBulk(artwork: MetObject): Bulk {
    const maxCm = getMaxDimensionCm(artwork);
    if (maxCm === null) return 'Inconnu';
    if (maxCm <= 15) return 'Poche';
    if (maxCm <= 60) return 'Sac à dos';
    if (maxCm <= 150) return 'Diable';
    return 'Camionnette';
}

export function estimateRisk(artwork: MetObject): Risk {
    const isOnDisplay = artwork.GalleryNumber !== '';
    if (artwork.isHighlight && isOnDisplay) return 'Élevé';
    if (artwork.isHighlight || isOnDisplay) return 'Moyen';
    return 'Faible';
}

export function getThiefStats(artwork: MetObject) {
    return { value: estimateValue(artwork), bulk: estimateBulk(artwork), risk: estimateRisk(artwork) };
}