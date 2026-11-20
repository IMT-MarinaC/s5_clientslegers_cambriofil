import type { ReactNode } from 'react';
import type { MetObject } from '../../api/types';
import { findContract } from '../../game/contracts';
import type { HeistRecord } from '../../game/history';
import { formatCentury, formatDate, formatYearRange, getCentury } from '../../utils/format';
import Stamp from '../ui/Stamp';
import ArtworkImage from './ArtworkImage';

interface ArtworkDetailsProps {
    artwork: MetObject;
    titleId: string;
    titleAs?: 'h1' | 'h2';
    heist?: HeistRecord;
    children?: ReactNode;
}

function describeHeist(heist: HeistRecord) {
    const client = findContract(heist.contractId)?.client ?? 'un commanditaire';
    return `Volée le ${formatDate(heist.date)} pour ${client} : ${heist.success ? 'livrée' : 'invendable'}`;
}

function getFacts(artwork: MetObject, heist?: HeistRecord) {
    return [
        { label: 'Artiste', value: artwork.artistDisplayName },
        { label: 'Siècle', value: artwork.objectDate && formatCentury(getCentury(artwork.objectBeginDate)) },
        { label: 'Années', value: artwork.objectDate && formatYearRange(artwork.objectBeginDate, artwork.objectEndDate) },
        { label: 'Culture', value: artwork.culture },
        { label: 'Classification', value: artwork.classification },
        { label: 'Matériau', value: artwork.medium },
        { label: 'Dimensions', value: artwork.dimensions },
        { label: 'Département', value: artwork.department },
        { label: 'Salle', value: artwork.GalleryNumber ? `n° ${artwork.GalleryNumber}` : 'En réserve' },
        { label: 'Dans ta planque', value: heist && describeHeist(heist) },
    ].filter((fact) => fact.value);
}

export default function ArtworkDetails({ artwork, titleId, titleAs: Title = 'h2', heist, children }: ArtworkDetailsProps) {
    return (
        <div className="detail">
            <div className="detail__header">
                <Title id={titleId} className="detail__title" tabIndex={-1}>{artwork.title || 'Sans titre'}</Title>
                <p className="muted typewriter">Fiche n° {artwork.objectID}</p>
            </div>
            <div className="detail__media tape">
                <ArtworkImage src={artwork.primaryImageSmall} alt={artwork.title} surveillance={false} />
                {heist && <Stamp tone={heist.success ? 'success' : 'danger'}>{heist.success ? 'Livrée' : 'Invendable'}</Stamp>}
            </div>
            <div className="detail__info">
                <dl className="sketch facts">
                    {getFacts(artwork, heist).map((fact) => (
                        <div key={fact.label} className="facts__row">
                            <dt>{fact.label}</dt>
                            <dd className="typewriter">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
                {children}
                <a href={artwork.objectURL} target="_blank" rel="noreferrer" className="btn">
                    Voir sur le site du Met
                </a>
            </div>
        </div>
    );
}