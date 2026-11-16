import {CONTRACTS} from '../game/contracts';
import {useContractCounts} from '../hooks/useMetQueries';
import ContractCard from '../components/game/ContractCard';
import {useHeistHistory} from "../hooks/useHeistHistory.ts";
import {formatEuros} from "../utils/format.ts";

export default function ContractsPage() {
    const museumCounts = useContractCounts(CONTRACTS);
    const { heists, totalLoot } = useHeistHistory();

    return (
        <>
            <h1>Les Contrats</h1>
            <p>Des commanditaires attendent. Retiens bien leur commande : dans la salle, tu n'auras que ton carnet.</p>
            <p>
                Butin accumulé : <strong className="highlight typewriter"> { formatEuros(totalLoot) } </strong> en { heists.length } casses.
            </p>
            <div className="grid">
                {CONTRACTS.map((contract, index) => (
                    <ContractCard key={contract.id} contract={contract} museumCount={museumCounts[index]} />
                ))}
            </div>
        </>
    );
}