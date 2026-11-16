import axe from 'axe-core';
import { screen } from '@testing-library/react';
import { renderApp } from '../tests/renderApp';

// jsdom ne calcule pas les couleurs : le contraste se vérifie avec Lighthouse dans le navigateur
const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } };

describe('Accessibilité (axe-core)', () => {
    it.each([
        ['/', 'Les Contrats'],
        ['/planque', 'La Planque'],
        ['/tableau-de-chasse', 'Tableau de chasse'],
    ])('la page %s ne contient aucune erreur détectable', async (route, heading) => {
        const { container } = renderApp(route);
        await screen.findByRole('heading', { level: 1, name: heading });

        const results = await axe.run(container, AXE_OPTIONS);
        expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });
});