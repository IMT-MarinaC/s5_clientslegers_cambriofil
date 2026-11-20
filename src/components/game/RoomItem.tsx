import { HandGrab, Search } from 'lucide-react';
import type { MetObject } from '../../api/types';
import ArtworkImage from '../artwork/ArtworkImage';

interface RoomItemProps {
    artwork: MetObject;
    onInspect: (artwork: MetObject) => void;
    onSteal: (artwork: MetObject) => void;
}

export default function RoomItem({ artwork, onInspect, onSteal }: RoomItemProps) {
    const title = artwork.title || 'Sans titre';

    return (
        <article className="sketch room-item">
            <div className="tape">
                <ArtworkImage src={artwork.primaryImageSmall} alt={title} />
            </div>
            <h3>{title}</h3>
            <div className="room-item__actions">
                {/* aria-label : 6 boutons "Voler" identiques seraient ambigus au lecteur d'écran */}
                <button type="button" className="btn" onClick={() => onInspect(artwork)} aria-label={`Examiner « ${title} »`}>
                    <Search aria-hidden="true" size={18} />
                    Examiner
                </button>
                <button type="button" className="btn btn--primary" onClick={() => onSteal(artwork)} aria-label={`Voler « ${title} »`}>
                    <HandGrab aria-hidden="true" size={18} />
                    Voler
                </button>
            </div>
        </article>
    );
}