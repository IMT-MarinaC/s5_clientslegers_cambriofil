const euroFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' });

export const formatEuros = (value: number) => euroFormatter.format(value);
export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate));

const ROMAN_NUMERALS: [number, string][] = [
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

function toRoman(value: number): string {
    let rest = value;
    let result = '';
    for (const [amount, symbol] of ROMAN_NUMERALS) {
        while (rest >= amount) {
            result += symbol;
            rest -= amount;
        }
    }
    return result;
}

//Conversion - Exemples :
// 1889 -> 19
// -1350 -> -14 (14e siècle avant JC)
export function getCentury(year: number): number {
    if (year > 0) return Math.ceil(year / 100);
    return -Math.max(1, Math.ceil(-year / 100));
}

export function formatCentury(century: number): string {
    return century > 0 ? `${toRoman(century)}e s.` : `${toRoman(-century)}e s. av. J.-C.`;
}