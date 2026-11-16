import type { MetObject } from '../../api/types';
import ArtworkImage from './ArtworkImage';
import ThiefStatsPanel from './ThiefStatsPanel';

interface ArtworkDetailsProps {
    artwork: MetObject;
    titleId: string;
    titleAs?: 'h1' | 'h2';
}

function getFacts(artwork: MetObject) {
    return [
        { label: 'Artiste', value: artwork.artistDisplayName },
        { label: 'Date', value: artwork.objectDate },
        { label: 'Culture', value: artwork.culture },
        { label: 'Classification', value: artwork.classification },
        { label: 'Matériau', value: artwork.medium },
        { label: 'Dimensions', value: artwork.dimensions },
        { label: 'Département', value: artwork.department },
        { label: 'Salle', value: artwork.GalleryNumber ? `n° ${artwork.GalleryNumber}` : 'En réserve' },
    ].filter((fact) => fact.value); // on n'affiche pas les champs vides
}

export default function ArtworkDetails({ artwork, titleId, titleAs: Title = 'h2' }: ArtworkDetailsProps) {
    return (
        <div className="detail">
            <div className="tape">
                <ArtworkImage src={artwork.primaryImageSmall} alt={artwork.title} surveillance={false} />
            </div>
            <div className="detail__info">
                <p className="muted typewriter">Fiche n° {artwork.objectID}</p>
                <Title id={titleId} className="detail__title">{artwork.title || 'Sans titre'}</Title>
                <dl className="sketch facts">
                    {getFacts(artwork).map((fact) => (
                        <div key={fact.label} className="facts__row">
                            <dt>{fact.label}</dt>
                            <dd className="typewriter">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
                <ThiefStatsPanel artwork={artwork} />
                <a href={artwork.objectURL} target="_blank" rel="noreferrer" className="btn">
                    Voir sur le site du Met
                </a>
            </div>
        </div>
    );
}