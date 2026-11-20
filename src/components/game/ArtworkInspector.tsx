import { useEffect, useRef, type MouseEvent } from 'react';
import { HandGrab, Undo2 } from 'lucide-react';
import type { MetObject } from '../../api/types';
import ArtworkDetails from '../artwork/ArtworkDetails';

const TITLE_ID = 'inspector-title';

interface ArtworkInspectorProps {
    artwork: MetObject;
    onClose: () => void;
    onSteal: (artwork: MetObject) => void;
}

export default function ArtworkInspector({ artwork, onClose, onSteal }: ArtworkInspectorProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) return;
        dialog.showModal();
        dialog.querySelector<HTMLElement>(`#${TITLE_ID}`)?.focus();
    }, []);

    const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
    };

    return (
        <dialog ref={dialogRef} className="inspector" aria-labelledby={TITLE_ID} onClose={onClose} onClick={closeOnBackdrop}>
            <div className="inspector__content">
                <ArtworkDetails artwork={artwork} titleId={TITLE_ID} />
                <div className="inspector__actions tape">
                    <button type="button" className="btn" onClick={() => dialogRef.current?.close()}>
                        <Undo2 aria-hidden="true" size={18} />
                        Reposer
                    </button>
                    <button type="button" className="btn btn--primary" onClick={() => onSteal(artwork)}>
                        <HandGrab aria-hidden="true" size={18} />
                        Voler celle-ci
                    </button>
                </div>
            </div>
        </dialog>
    );
}