import { Link } from 'react-router';
import { findContract } from '../../game/contracts';
import type { BurglaryRecord } from '../../game/history';
import { formatDate, formatEuros } from '../../utils/format';
import ArtworkImage from '../artwork/ArtworkImage';
import Badge from '../ui/Badge';

export default function StolenCard({ burglary }: { burglary: BurglaryRecord }) {
    const { artwork } = burglary;
    const contract = findContract(burglary.contractId);

    return (
        <article className="sketch sketch--interactive stolen-card">
            <div className="stolen-card__photo tape">
                <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
                {!burglary.success && <span className="stamp" aria-hidden="true">Invendable</span>}
            </div>
            <h3>
                <Link to={`/oeuvre/${artwork.objectID}`} className="stretched-link">{artwork.title}</Link>
            </h3>
            <p className="muted typewriter">Volée le {formatDate(burglary.date)} · {artwork.department}</p>
            {!burglary.success && contract && burglary.missedClue && (
                <p className="muted">Pour {contract.client}, qui voulait une pièce {burglary.missedClue}.</p>
            )}
            <div className="badges">
                <Badge label="Valeur" value={formatEuros(artwork.value)} />
                {burglary.success ? (
                    <Badge label="Livrée" value={formatEuros(burglary.reward)} />
                ) : (
                    <Badge label="Statut" value="Invendable" danger />
                )}
            </div>
        </article>
    );
}