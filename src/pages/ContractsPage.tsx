import {CONTRACTS} from '../game/contracts';
import {useContractCounts} from '../hooks/useMetQueries';
import ContractCard from '../components/game/ContractCard';
import {useBurglaryHistory} from "../hooks/useBurglaryHistory.ts";
import {formatEuros} from "../utils/format.ts";

export default function ContractsPage() {
    const museumCounts = useContractCounts(CONTRACTS);
    const { burglaries, totalLoot } = useBurglaryHistory();

    return (
        <>
            <h1>Les Contrats</h1>
            <p>Des commanditaires attendent. Retiens bien leur commande : dans la salle, tu n'auras que ton carnet.</p>
            <p>
                Butin accumulé : <strong className="highlight typewriter"> { formatEuros(totalLoot) } </strong> en { burglaries.length } casses.
            </p>
            <div className="grid">
                {CONTRACTS.map((contract, index) => (
                    <ContractCard key={contract.id} contract={contract} museumCount={museumCounts[index]} />
                ))}
            </div>
        </>
    );
}