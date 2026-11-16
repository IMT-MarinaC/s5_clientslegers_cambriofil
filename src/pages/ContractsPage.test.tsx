import { screen } from '@testing-library/react';
import { renderApp } from '../tests/renderApp';

it('affiche les 4 contrats avec le nombre de pièces au Met', async () => {
    renderApp('/');
    expect(screen.getAllByRole('link', { name: 'Accepter le contrat' })).toHaveLength(4);
    expect(await screen.findAllByText('8')).toHaveLength(4); // total renvoyé par le faux serveur
});