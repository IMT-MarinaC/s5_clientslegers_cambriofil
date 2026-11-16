import { useState } from 'react';
import { Link } from 'react-router';
import type { BurglaryRecord } from '../game/history';
import { useBurglaryHistory } from '../hooks/useBurglaryHistory';
import { formatEuros } from '../utils/format';
import StolenCard from '../components/hideout/StolenCard';
import EmptyState from '../components/ui/EmptyState';

type Filter = 'all' | 'delivered' | 'unsold';

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'delivered', label: 'Livrées' },
    { id: 'unsold', label: 'Invendables' },
];

const matchesFilter = (burglary: BurglaryRecord, filter: Filter) =>
    filter === 'all' || (filter === 'delivered') === burglary.success;

export default function HideoutPage() {
    const { burglaries: burglary } = useBurglaryHistory();
    const [filter, setFilter] = useState<Filter>('all');

    const countFor = (option: Filter) => burglary.filter((burglary) => matchesFilter(burglary, option)).length;
    const visibleBurglary = burglary.filter((burglary) => matchesFilter(burglary, filter)).reverse();
    const sleepingValue = visibleBurglary.reduce((total, burglary) => total + burglary.artwork.value, 0);

    return (
        <>
            <h1>La Planque</h1>
            {burglary.length === 0 ? (
                <EmptyState title="Ta planque est vide" action={<Link to="/" className="btn btn--primary">Voir les contrats</Link>}>
                    Remplis un premier contrat : chaque pièce volée atterrit ici, livrée ou non.
                </EmptyState>
            ) : (
                <>
                    <p>{burglary.length} pièces entassées ici.</p>
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
                    {filter === 'unsold' && visibleBurglary.length > 0 && (
                        <p className="muted">
                            Aucun commanditaire n'en a voulu, mais elles restent à toi : {formatEuros(sleepingValue)} de valeur qui dort sous ton lit.
                        </p>
                    )}
                    <div className="grid">
                        {visibleBurglary.map((burglary) => (
                            <StolenCard key={burglary.id} burglary={burglary} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}