import { formatCentury, formatYearRange, getCentury } from './format';

describe('getCentury', () => {
    it.each([
        [1889, 19],
        [1900, 19],
        [-1350, -14],
        [0, -1],
    ])('l’année %i est au siècle %i', (year, century) => {
        expect(getCentury(year)).toBe(century);
    });
});

it.each([
    [19, 'XIXe siècle'],
    [1, 'Ier siècle'],
    [-14, 'XIVe siècle av.\u00a0J.\u2011C.'],
])('formate le siècle %i en « %s »', (century, label) => {
    expect(formatCentury(century)).toBe(label);
});

it.each([
    [-1600, -1450, '1600 – 1450 av.\u00a0J.\u2011C.'],
    [-50, 30, '50 av.\u00a0J.\u2011C. – 30'],
    [1885, 1890, '1885 – 1890'],
    [1500, 1500, '1500'],
])('formate les années %i à %i', (begin, end, label) => {
    expect(formatYearRange(begin, end)).toBe(label);
});