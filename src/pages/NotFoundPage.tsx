import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <section className="sketch">
            <h1>Mauvaise porte</h1>
            <p>Cette salle n'existe pas. Fais demi-tour avant que l'alarme sonne.</p>
            <Link to="/" className="btn">Retour aux contrats</Link>
        </section>
    );
}