import {Link} from 'react-router';
import type {Contract} from '../../game/contracts';
import {formatEuros} from '../../utils/format';
import Badge from '../ui/Badge';

interface ContractCardProps {
    contract: Contract;
    museumCount?: number;
}

export default function ContractCard({ contract, museumCount }: ContractCardProps) {
    return (
        <article className="sketch sketch--overshoot contract-card">
            <p className="muted typewriter">{contract.difficulty} · {contract.clueTypes.length} critères</p>
            <h2>{contract.client}</h2>
            <p className="contract-card__title">« {contract.title} »</p>
            <p className="muted">{contract.pitch}</p>
            <div className="contract-card__footer">
                <div className="badges">
                    <Badge label="Prime" value={formatEuros(contract.reward)} />
                    <span title="Œuvres du Met qui correspondent à ce contrat">
                    <Badge label="Cibles repérées" value={museumCount?.toLocaleString('fr-FR') ?? '…'} />
                </span>
                </div>
                <Link to={`/contrats/${contract.id}`} className="btn btn--primary">
                    Accepter le contrat
                </Link>
            </div>
        </article>
    );
}