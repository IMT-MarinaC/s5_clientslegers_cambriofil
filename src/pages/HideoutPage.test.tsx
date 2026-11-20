import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from '../tests/renderApp';

const stolen = (id: number, success: boolean) => ({
    id: String(id),
    date: '2026-11-16T10:00:00Z',
    contractId: 'professeure',
    success,
    reward: success ? 150_000 : 0,
    callsMade: 0,
    missedClue: success ? undefined : 'classée « Vases »',
    artwork: { objectID: id, title: `Pièce ${id}`, department: 'Greek and Roman Art', imageUrl: '', value: 1000 },
});

it('affiche un état vide au départ', () => {
    renderApp('/planque');
    expect(screen.getByRole('heading', { name: 'Ta planque est vide' })).toBeInTheDocument();
});

it('filtre les invendables et rappelle pour qui elles étaient', async () => {
    localStorage.setItem('cambriofil:heists', JSON.stringify([stolen(1, true), stolen(2, false)]));
    const user = userEvent.setup();
    renderApp('/planque');

    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: /Invendables/ }));

    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Pièce 2')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveTextContent('Pour La Professeure, qui voulait une pièce classée « Vases ».');
});