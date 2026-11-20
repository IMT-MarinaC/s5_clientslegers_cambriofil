import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useObject } from '../hooks/useMetQueries';
import ArtworkDetails from '../components/artwork/ArtworkDetails';
import ThiefStatsPanel from '../components/artwork/ThiefStatsPanel';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useHeistHistory } from "../hooks/useHeistHistory.ts";

export default function ArtworkDetailPage() {
    const { id } = useParams();
    const { data: artwork, isLoading, isError, refetch } = useObject(Number(id));
    const { heists } = useHeistHistory();

    if (isLoading) return <Loader />;
    if (isError || !artwork) {
        return <ErrorMessage message="Cette pièce a disparu des registres." onRetry={() => refetch()} />;
    }

    // L'historique va du plus ancien au plus récent : findLast donne le dernier vol
    const lastHeist = heists.findLast((heist) => heist.artwork.objectID === artwork.objectID);

    return (
        <article>
            <Link to="/planque" className="btn">
                <ArrowLeft aria-hidden="true" size={18} />
                Retour à la planque
            </Link>
            <ArtworkDetails
                artwork={artwork}
                titleId="artwork-title"
                titleAs="h1"
                heist={lastHeist}
            >
                <ThiefStatsPanel artwork={artwork} />
            </ArtworkDetails>
        </article>
    );
}