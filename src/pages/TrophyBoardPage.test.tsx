import { screen, waitFor } from '@testing-library/react';
import { renderApp } from '../tests/renderApp';

const tile = (label: string) => screen.getByText(label).parentElement;

it('montre les réserves du musée même sans aucun casse', async () => {
    renderApp('/tableau-de-chasse');
    expect(screen.getByRole('heading', { name: 'Pas encore de casse' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Les réserves du musée' })).toBeInTheDocument();
    expect(await screen.findAllByText('5 en réserve, 3 exposées')).toHaveLength(2);
});

it('affiche les chiffres du musée en permanence', async () => {
    renderApp('/tableau-de-chasse');
    await waitFor(() => expect(tile('En réserve')).toHaveTextContent('5'));
    expect(tile('Œuvres photographiées')).toHaveTextContent('8');
    expect(tile('Exposées en salle')).toHaveTextContent('3');
    expect(tile('Pièces maîtresses')).toHaveTextContent('1');
});