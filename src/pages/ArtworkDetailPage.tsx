import { Link, useParams } from 'react-router';
import { useObject } from '../hooks/useMetQueries';
import ArtworkDetails from '../components/artwork/ArtworkDetails';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import {useHeistHistory} from "../hooks/useHeistHistory.ts";
import StolenHistory from "../components/hideout/StolenHistory.tsx";

export default function ArtworkDetailPage() {
    const { id } = useParams();
    const { data: artwork, isLoading, isError, refetch } = useObject(Number(id));
    const { heists } = useHeistHistory();

    if (isLoading) return <Loader />;
    if (isError || !artwork) {
        return <ErrorMessage message="Cette pièce a disparu des registres." onRetry={() => refetch()} />;
    }

    return (
        <article>
            <Link to="/planque" className="btn">Retour à la planque</Link>
            <ArtworkDetails
                artwork={artwork}
                titleId="artwork-title"
                titleAs="h1"
                mediaFooter={<StolenHistory heists={heists.filter((heist) => heist.artwork.objectID === artwork.objectID)} />}
            />
            </article>
    );
}