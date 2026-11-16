import { useDepartmentReserves } from '../hooks/useMetQueries';
import MuseumReservesChart from '../components/charts/MuseumReservesChart';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function TrophyBoardPage() {
    const museum = useDepartmentReserves();

    return (
        <>
            <h1>Tableau de chasse</h1>
            <section className="trophy-section" aria-labelledby="museum-title">
                <h2 id="museum-title">Le musée vu par un pro</h2>
                {museum.isLoading && <Loader label="Le guetteur compte les vitrines" />}
                {museum.isError && <ErrorMessage onRetry={() => museum.refetch()} />}
                {!museum.isLoading && !museum.isError && <MuseumReservesChart data={museum.reserves} />}
            </section>
        </>
    );
}