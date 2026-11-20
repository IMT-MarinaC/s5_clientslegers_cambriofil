export const CHART_FILLS = [
    'url(#fill-solid)',
    'url(#fill-hatch)',
    'url(#fill-red)',
    'url(#fill-cross)',
    'url(#fill-red-hatch)',
    'url(#fill-dots)',
];

export const AXIS_TICK = { fill: 'var(--ink)', fontFamily: 'Patrick Hand, cursive', fontSize: 14 };

export const TOOLTIP_STYLE = {
    background: 'var(--paper)',
    border: '2px solid var(--ink)',
    borderRadius: 12,
    fontFamily: 'Patrick Hand, cursive',
    color: 'var(--ink)',
};

export const TOOLTIP_CURSOR = { fill: 'var(--ink-soft)', fillOpacity: 0.15 };

export const DEFAULT_CHART_HEIGHT = 300;
export const formatCount = (value: unknown) => Number(value).toLocaleString('fr-FR');

const MAX_LABEL_LENGTH = 14;
export const shortenLabel = (label: string) =>
    label.length > MAX_LABEL_LENGTH ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…` : label;