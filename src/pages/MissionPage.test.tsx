import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../api/metApi';
import { server } from '../tests/handlers';
import { renderApp } from '../tests/renderApp';

describe('Mission', () => {
    it('enchaîne briefing, carnet, examen, vol, puis range la pièce dans la planque', async () => {
        const user = userEvent.setup();
        renderApp('/contrats/collectionneur');

        await user.click(await screen.findByRole('button', { name: /c'est noté/i }));
        expect(screen.getByRole('heading', { name: 'La salle' })).toBeInTheDocument();
        expect(screen.getAllByText('Note illisible')).toHaveLength(2);

        await user.click(screen.getByRole('button', { name: /appeler le commanditaire/i }));
        expect(screen.getAllByText('Note illisible')).toHaveLength(1);

        await user.click(screen.getAllByRole('button', { name: /^Examiner/ })[0]);
        const dialog = screen.getByRole('dialog');
        expect(within(dialog).getByRole('link', { name: 'Voir sur le site du Met' })).toBeInTheDocument();

        await user.click(within(dialog).getByRole('button', { name: 'Voler celle-ci' }));
        expect(screen.getByRole('heading', { name: /contrat rempli|mauvaise pioche/i })).toBeInTheDocument();

        await user.click(screen.getByRole('link', { name: 'Voir ma planque' }));
        expect(await screen.findByRole('heading', { name: 'La Planque' })).toBeInTheDocument();
        expect(screen.getAllByRole('article')).toHaveLength(1);
    });

    it('ferme la fenêtre Examiner d’un clic à côté, sans rien voler', async () => {
        const user = userEvent.setup();
        renderApp('/contrats/collectionneur');

        await user.click(await screen.findByRole('button', { name: /c'est noté/i }));
        await user.click(screen.getAllByRole('button', { name: /^Examiner/ })[0]);
        await user.click(screen.getByRole('dialog'));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'La salle' })).toBeInTheDocument();
    });

    it('affiche une erreur si l’API ne répond plus', async () => {
        server.use(http.get(`${BASE_URL}/v1.1/search`, () => new HttpResponse(null, { status: 500 })));
        renderApp('/contrats/comtesse');
        expect(await screen.findByRole('alert')).toHaveTextContent(/sécurité/i);
    });

    it('affiche la page 404 pour un contrat inconnu', async () => {
        renderApp('/contrats/inconnu');
        expect(await screen.findByRole('heading', { name: 'Mauvaise porte' })).toBeInTheDocument();
    });
});