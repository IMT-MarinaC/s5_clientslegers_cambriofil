import { Link } from 'react-router';
import type { Contract } from '../../game/contracts';
import { formatEuros } from '../../utils/format';
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
            <div className="badges">
                <Badge label="Prime" value={formatEuros(contract.reward)} />
                <Badge label="Pièces au Met" value={museumCount?.toLocaleString('fr-FR') ?? '…'} />
            </div>
            <Link to={`/contrats/${contract.id}`} className="btn btn--primary">
                Accepter le contrat
            </Link>
        </article>
    );
}