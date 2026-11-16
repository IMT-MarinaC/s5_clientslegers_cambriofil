import { useEffect, useState } from 'react';
import type { Contract } from '../../game/contracts';
import type { Clue } from '../../game/clue';

const BRIEFING_SECONDS = 20;
const EXTRA_SECONDS = 20;

interface BriefingProps {
    contract: Contract;
    clues: Clue[];
    onReady: () => void;
}

export default function Briefing({ contract, clues, onReady }: BriefingProps) {
    const [secondsLeft, setSecondsLeft] = useState(BRIEFING_SECONDS);

    useEffect(() => {
        if (secondsLeft === 0) {
            onReady();
            return;
        }
        const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [secondsLeft, onReady]);

    return (
        <section className="sketch sketch--overshoot briefing" aria-labelledby="briefing-title">
            <p className="muted typewriter">Message de {contract.client}</p>
            <h1 id="briefing-title">{contract.title}</h1>
            <p>{contract.pitch} Je veux une pièce :</p>
            <ul className="briefing__clues">
                {clues.map((clue) => (
                    <li key={clue.type}><span className="highlight">{clue.text}</span></li>
                ))}
            </ul>
            {/* role="timer" n'est pas annoncé chaque seconde par les lecteurs d'écran */}
            <p role="timer">
                Ce message s'autodétruit dans <strong className="typewriter">{secondsLeft} s</strong>
            </p>
            <div className="briefing__actions">
                <button type="button" className="btn btn--primary" onClick={onReady}>
                    C'est noté, j'y vais
                </button>
                {/* Accessibilité (WCAG 2.2.1) : un temps limité doit pouvoir être prolongé */}
                <button type="button" className="btn" onClick={() => setSecondsLeft((seconds) => seconds + EXTRA_SECONDS)}>
                    Il me faut plus de temps (+{EXTRA_SECONDS} s)
                </button>
            </div>
        </section>
    );
}