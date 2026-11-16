import { screen } from '@testing-library/react';
import { renderApp } from '../tests/renderApp';

it('montre les réserves du musée même sans aucun casse', async () => {
    renderApp('/tableau-de-chasse');
    expect(screen.getByRole('heading', { name: 'Pas encore de casse' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Les réserves du musée' })).toBeInTheDocument();
});