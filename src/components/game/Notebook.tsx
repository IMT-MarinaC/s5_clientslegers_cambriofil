import type { Clue } from '../../game/clue';
import { CALL_PENALTY } from '../../game/reward';
import ClueText from './ClueText';

const SCRIBBLE = 'gribouillis illisible au crayon';

interface NotebookProps {
    clues: Clue[];
    revealedCount: number;
    onCall: () => void;
}

export default function Notebook({ clues, revealedCount, onCall }: NotebookProps) {
    const hasHiddenNotes = revealedCount < clues.length;

    return (
        <aside className="sketch sketch--overshoot notebook" aria-labelledby="notebook-title">
            <h2 id="notebook-title">Ton carnet</h2>
            {/* aria-live : le lecteur d'écran annonce la ligne révélée après un appel */}
            <ul aria-live="polite">
                {clues.map((clue, index) =>
                    index < revealedCount ? (
                        <li key={clue.type}><ClueText clue={clue} /></li>
                    ) : (
                        <li key={clue.type} className="notebook__blurred">
                            <span aria-hidden="true">{SCRIBBLE}</span>
                            <span className="sr-only">Note illisible</span>
                        </li>
                    ),
                )}
            </ul>
            <button type="button" className="btn" onClick={onCall} disabled={!hasHiddenNotes}>
                Appeler le commanditaire (-{CALL_PENALTY * 100} % de prime)
            </button>
        </aside>
    );
}