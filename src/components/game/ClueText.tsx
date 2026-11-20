import type { Clue } from '../../game/clue';

export default function ClueText({ clue }: { clue: Clue }) {
    const start = clue.text.lastIndexOf(clue.value);
    if (start < 0) return clue.text;

    return (
        <>
            {clue.text.slice(0, start)}
            <span className="highlight">{clue.value}</span>
            {clue.text.slice(start + clue.value.length)}
        </>
    );
}