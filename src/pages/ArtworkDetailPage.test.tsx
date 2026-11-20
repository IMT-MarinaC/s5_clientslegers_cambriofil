import { screen } from '@testing-library/react';
import { renderApp } from '../tests/renderApp';

it('affiche la fiche et un risque élevé pour une pièce maîtresse exposée', async () => {
    renderApp('/oeuvre/2');
    expect(await screen.findByRole('heading', { level: 1, name: 'Épée de chevalier' })).toBeInTheDocument();
    expect(screen.getByText('n° 371')).toBeInTheDocument();
    expect(screen.getByText('Élevé')).toBeInTheDocument();
    expect(screen.queryByText('Dans ta planque')).not.toBeInTheDocument();
});

it('rappelle quand et pour qui la pièce a été volée', async () => {
    const heist = {
        id: '1',
        date: '2026-11-16T10:00:00Z',
        contractId: 'monsieur-gris',
        success: true,
        reward: 150_000,
        callsMade: 1,
        artwork: { objectID: 2, title: 'Épée de chevalier', department: 'Arms and Armor', imageUrl: '', value: 1000 },
    };
    localStorage.setItem('cambriofil:heists', JSON.stringify([heist]));
    renderApp('/oeuvre/2');

    expect(await screen.findByText('Dans ta planque')).toBeInTheDocument();
    expect(screen.getByText('Volée le 16 novembre pour Monsieur Gris : livrée')).toBeInTheDocument();
});

it('affiche un message si l’œuvre n’existe pas', async () => {
    renderApp('/oeuvre/999');
    expect(await screen.findByRole('alert')).toHaveTextContent(/disparu/i);
});