import { useId } from 'react';
import type { MetObject } from '../../api/types';
import { getThiefStats, type Risk } from '../../utils/thiefStats';
import { formatEuros } from '../../utils/format';

const RISK_ADVICE: Record<Risk, string> = {
    Faible: "Elle dort en réserve, personne ne la regarde. Cible idéale.",
    Moyen: "Quelques gardes passent devant. Venir de nuit.",
    Élevé: "Pièce star, exposée et surveillée. Réservée aux pros.",
};

export default function ThiefStatsPanel({ artwork }: { artwork: MetObject }) {
    const titleId = useId();
    const { value, bulk, risk } = getThiefStats(artwork);

    return (
        <section className="sketch sketch--overshoot thief-panel" aria-labelledby={titleId}>
            <h3 id={titleId}>L'avis du receleur</h3>
            <ul>
                <li>Valeur estimée : <strong className="highlight typewriter">{formatEuros(value)}</strong></li>
                <li>Pour l'emporter : <strong className="typewriter">{bulk}</strong></li>
                <li>
                    Risque : <strong className={risk === 'Élevé' ? 'typewriter danger' : 'typewriter'}>{risk}</strong>
                </li>
            </ul>
            <p className="muted">{RISK_ADVICE[risk]}</p>
        </section>
    );
}