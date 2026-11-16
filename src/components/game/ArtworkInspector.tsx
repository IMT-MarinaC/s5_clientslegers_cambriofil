import { useEffect, useRef } from 'react';
import type { MetObject } from '../../api/types';
import ArtworkDetails from '../artwork/ArtworkDetails';

interface ArtworkInspectorProps {
    artwork: MetObject;
    onClose: () => void;
    onSteal: (artwork: MetObject) => void;
}

export default function ArtworkInspector({ artwork, onClose, onSteal }: ArtworkInspectorProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) dialog.showModal(); //le test "open" évite une erreur en StrictMode
    }, []);

    return (
        <dialog ref={dialogRef} className="sketch inspector" aria-labelledby="inspector-title" onClose={onClose}>
            <ArtworkDetails artwork={artwork} titleId="inspector-title" />
            <div className="inspector__actions">
                <button type="button" className="btn" onClick={() => dialogRef.current?.close()}>
                    Reposer
                </button>
                <button type="button" className="btn btn--primary" onClick={() => onSteal(artwork)}>
                    Voler celle-ci
                </button>
            </div>
        </dialog>
    );
}