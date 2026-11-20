import { Link } from 'react-router';
import { findContract } from '../../game/contracts';
import type { HeistRecord } from '../../game/history';
import {formatDate, formatEuros, withFinalPeriod} from '../../utils/format';
import ArtworkImage from '../artwork/ArtworkImage';
import Badge from '../ui/Badge';
import Stamp from '../ui/Stamp';

export default function StolenCard({ heist }: { heist: HeistRecord }) {
    const { artwork } = heist;
    const contract = findContract(heist.contractId);

    return (
        <article className="sketch sketch--interactive stolen-card">
            <div className="stolen-card__photo tape">
                <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
                {!heist.success && <Stamp tone="danger">Invendable</Stamp>}
            </div>
            <h3>
                <Link to={`/oeuvre/${artwork.objectID}`} className="stretched-link">{artwork.title}</Link>
            </h3>
            <p className="muted typewriter">Volée le {formatDate(heist.date)} · {artwork.department}</p>
            {!heist.success && contract && heist.missedClue && (
                <p className="muted">Pour {contract.client}, qui voulait une pièce {withFinalPeriod(heist.missedClue)}</p>
            )}
            <div className="badges">
                <Badge label="Valeur" value={formatEuros(artwork.value)} />
                {heist.success ? (
                    <Badge label="Livrée" value={formatEuros(heist.reward)} tone="success" />
                ) : (
                    <Badge label="Statut" value="Invendable" tone="danger" />
                )}
            </div>
        </article>
    );
}