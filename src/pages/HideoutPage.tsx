import { useState } from 'react';
import { Link } from 'react-router';
import type { HeistRecord } from '../game/history';
import { useHeistHistory } from '../hooks/useHeistHistory.ts';
import { formatEuros } from '../utils/format';
import StolenCard from '../components/hideout/StolenCard';
import EmptyState from '../components/ui/EmptyState';

type Filter = 'all' | 'delivered' | 'unsold';

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'delivered', label: 'Livrées' },
    { id: 'unsold', label: 'Invendables' },
];

const matchesFilter = (heist: HeistRecord, filter: Filter) =>
    filter === 'all' || (filter === 'delivered') === heist.success;

export default function HideoutPage() {
    const { heists: heist } = useHeistHistory();
    const [filter, setFilter] = useState<Filter>('all');

    const countFor = (option: Filter) => heist.filter((heist) => matchesFilter(heist, option)).length;
    const visibleHeist = heist.filter((heist) => matchesFilter(heist, filter)).reverse();
    const sleepingValue = visibleHeist.reduce((total, heist) => total + heist.artwork.value, 0);

    return (
        <>
            <h1>La Planque</h1>
            {heist.length === 0 ? (
                <EmptyState title="Ta planque est vide" action={<Link to="/" className="btn btn--primary">Voir les contrats</Link>}>
                    Remplis un premier contrat : chaque pièce volée atterrit ici, livrée ou non.
                </EmptyState>
            ) : (
                <>
                    <p>{heist.length} pièces entassées ici.</p>
                    <div className="filter-bar" role="group" aria-label="Filtrer les pièces">
                        {FILTERS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className="btn"
                                aria-pressed={filter === option.id}
                                onClick={() => setFilter(option.id)}
                            >
                                {option.label} · {countFor(option.id)}
                            </button>
                        ))}
                    </div>
                    {filter === 'unsold' && visibleHeist.length > 0 && (
                        <p className="muted">
                            Aucun commanditaire n'en a voulu, mais elles restent à toi : {formatEuros(sleepingValue)} de valeur qui dort sous ton lit.
                        </p>
                    )}
                    <div className="grid">
                        {visibleHeist.map((heist) => (
                            <StolenCard key={heist.id} heist={heist} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}