import { useState } from 'react';
import { useParams } from 'react-router';
import { findContract } from '../game/contracts';
import { useMissionPool } from '../hooks/useMetQueries';
import MissionGame from '../components/game/MissionGame';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import NotFoundPage from './NotFoundPage';

export default function MissionPage() {
    const { contractId } = useParams();
    const contract = findContract(contractId);
    const pool = useMissionPool(contract);
    const [round, setRound] = useState(0);

    if (!contract) return <NotFoundPage />;
    if (pool.isLoading) return <Loader label="Le commanditaire arrive" />;
    if (pool.isError || !pool.data) return <ErrorMessage onRetry={() => pool.refetch()} />;

    return <MissionGame key={round} contract={contract} pool={pool.data} onReplay={() => setRound((r) => r + 1)} />;
}