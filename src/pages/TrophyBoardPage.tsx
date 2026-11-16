import { Link } from 'react-router';
import { CONTRACTS } from '../game/contracts';
import { cumulativeLoot, scoreByContract, stolenByDepartment, summarizeHeists } from '../game/heistStats';
import { useHeistHistory } from '../hooks/useHeistHistory';
import { useDepartmentReserves } from '../hooks/useMetQueries';
import StatTiles from '../components/charts/StatTiles';
import LootAreaChart from '../components/charts/LootAreaChart';
import ScoreByContractChart from '../components/charts/ScoreByContractChart';
import StolenByDepartmentChart from '../components/charts/StolenByDepartmentChart';
import MuseumReservesChart from '../components/charts/MuseumReservesChart';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function TrophyBoardPage() {
    const { heists } = useHeistHistory();
    const museum = useDepartmentReserves();

    return (
        <>
            <h1>Tableau de chasse</h1>

            <section className="trophy-section" aria-labelledby="exploits-title">
                <h2 id="exploits-title">Tes exploits</h2>
                <StatTiles summary={summarizeHeists(heists)} />
                {heists.length === 0 ? (
                    <EmptyState title="Pas encore de casse" action={<Link to="/" className="btn btn--primary">Choisir un contrat</Link>}>
                        Tes graphiques se dessineront après ta première mission.
                    </EmptyState>
                ) : (
                    <div className="charts">
                        <LootAreaChart data={cumulativeLoot(heists)} />
                        <ScoreByContractChart data={scoreByContract(heists, CONTRACTS)} />
                        <StolenByDepartmentChart data={stolenByDepartment(heists)} />
                    </div>
                )}
            </section>

            <section className="trophy-section" aria-labelledby="museum-title">
                <h2 id="museum-title">Le musée vu par un pro</h2>
                {museum.isLoading && <Loader label="Le guetteur compte les vitrines" />}
                {museum.isError && <ErrorMessage onRetry={() => museum.refetch()} />}
                {!museum.isLoading && !museum.isError && <MuseumReservesChart data={museum.reserves} />}
            </section>
        </>
    );
}