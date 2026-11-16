import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
            <footer className="footer">
                Données : Issues de l'API de The Metropolitan Museum of Art (Open Access, CC0). Les statistiques affichées et les données sont des valeurs fictives.
            </footer>
        </>
    );
}