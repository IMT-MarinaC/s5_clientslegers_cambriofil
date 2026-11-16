import { Link } from 'react-router';
import { findContract } from '../../game/contracts';
import type { HeistRecord } from '../../game/history';
import { formatDate, formatEuros } from '../../utils/format';
import ArtworkImage from '../artwork/ArtworkImage';
import Badge from '../ui/Badge';

export default function StolenCard({ heist }: { heist: HeistRecord }) {
    const { artwork } = heist;
    const contract = findContract(heist.contractId);

    return (
        <article className="sketch sketch--interactive stolen-card">
            <div className="stolen-card__photo tape">
                <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
                {!heist.success && <span className="stamp" aria-hidden="true">Invendable</span>}
            </div>
            <h3>
                <Link to={`/oeuvre/${artwork.objectID}`} className="stretched-link">{artwork.title}</Link>
            </h3>
            <p className="muted typewriter">Volée le {formatDate(heist.date)} · {artwork.department}</p>
            {!heist.success && contract && heist.missedClue && (
                <p className="muted">Pour {contract.client}, qui voulait une pièce {heist.missedClue}.</p>
            )}
            <div className="badges">
                <Badge label="Valeur" value={formatEuros(artwork.value)} />
                {heist.success ? (
                    <Badge label="Livrée" value={formatEuros(heist.reward)} />
                ) : (
                    <Badge label="Statut" value="Invendable" danger />
                )}
            </div>
        </article>
    );
}