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
        if (!dialog || dialog.open) return; //le test "open" évite une erreur en StrictMode
        dialog.showModal();
        // Sinon le navigateur donne le focus au premier lien (« Voir sur le site du Met ») et fait défiler jusqu'à lui :
        // on part du titre, que le lecteur d'écran annonce en premier
        dialog.querySelector<HTMLElement>(`#${TITLE_ID}`)?.focus();
    }, []);

    // Un clic sur le fond assombri vise le <dialog> lui-même (son contenu est dans .inspector__content) : on ferme
    const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
    };

    return (
        <dialog ref={dialogRef} className="inspector" aria-labelledby={TITLE_ID} onClose={onClose} onClick={closeOnBackdrop}>
            <div className="inspector__content">
                <ArtworkDetails artwork={artwork} titleId={TITLE_ID} />
                {/* Coupon scotché en bas : les deux choix restent à portée de main pendant qu'on lit la fiche */}
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