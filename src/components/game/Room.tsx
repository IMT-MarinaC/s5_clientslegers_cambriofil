import { useState } from 'react';
import type { MetObject } from '../../api/types';
import type { Clue } from '../../game/clue';
import { formatEuros } from '../../utils/format';
import ArtworkInspector from './ArtworkInspector';
import Notebook from './Notebook';
import RoomItem from './RoomItem';

interface RoomProps {
    candidates: MetObject[];
    clues: Clue[];
    revealedCount: number;
    reward: number;
    onCall: () => void;
    onSteal: (artwork: MetObject) => void;
}

export default function Room({ candidates, clues, revealedCount, reward, onCall, onSteal }: RoomProps) {
    const [inspected, setInspected] = useState<MetObject | null>(null);

    return (
        <>
            <h1>La salle</h1>
            <p>
                Les gardiens changent de ronde. Tu n'as le temps de prendre qu'<span className="highlight">une seule pièce</span>.
                Prime actuelle : <strong className="typewriter">{formatEuros(reward)}</strong>
            </p>
            <div className="room">
                <Notebook clues={clues} revealedCount={revealedCount} onCall={onCall} />
                <div className="grid room__items">
                    {candidates.map((artwork) => (
                        <RoomItem key={artwork.objectID} artwork={artwork} onInspect={setInspected} onSteal={onSteal} />
                    ))}
                </div>
            </div>
            {inspected && <ArtworkInspector artwork={inspected} onClose={() => setInspected(null)} onSteal={onSteal} />}
        </>
    );
}