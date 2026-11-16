import { formatCentury, getCentury } from './format';

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

it('formate les siècles avant J.-C. en chiffres romains', () => {
    expect(formatCentury(-14)).toBe('XIVe s. av. J.-C.');
});