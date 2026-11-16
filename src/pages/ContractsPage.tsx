import { CONTRACTS } from '../game/contracts';
import { useContractCounts } from '../hooks/useMetQueries';
import ContractCard from '../components/game/ContractCard';

export default function ContractsPage() {
    const museumCounts = useContractCounts(CONTRACTS);

    return (
        <>
            <h1>Les Contrats</h1>
            <p>Des commanditaires attendent. Retiens bien leur commande : dans la salle, tu n'auras que ton carnet.</p>
            <div className="grid">
                {CONTRACTS.map((contract, index) => (
                    <ContractCard key={contract.id} contract={contract} museumCount={museumCounts[index]} />
                ))}
            </div>
        </>
    );
}