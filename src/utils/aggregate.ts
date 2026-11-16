export interface Slice {
    name: string;
    value: number;
}

export function sumBy<T>(items: T[], getKey: (item: T) => string, getValue: (item: T) => number): Slice[] {
    const totals = new Map<string, number>();
    for (const item of items) {
        const key = getKey(item) || 'Inconnu';
        totals.set(key, (totals.get(key) ?? 0) + getValue(item));
    }
    return [...totals.entries()]
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
}

export const countBy = <T>(items: T[], getKey: (item: T) => string) => sumBy(items, getKey, () => 1);

export function keepTop(slices: Slice[], max: number): Slice[] {
    if (slices.length <= max) return slices;
    const others = slices.slice(max - 1).reduce((total, slice) => total + slice.value, 0);
    return [...slices.slice(0, max - 1), { name: 'Autres', value: others }];
}