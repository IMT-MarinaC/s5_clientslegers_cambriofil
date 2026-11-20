import type { ReactNode } from 'react';
import type { Tone } from './tone';

interface StampProps {
    tone: Tone;
    children: ReactNode;
}

// Purement décoratif : l'information est toujours écrite ailleurs (badge, fiche), d'où aria-hidden
export default function Stamp({ tone, children }: StampProps) {
    return (
        <span className={`stamp stamp--${tone}`} aria-hidden="true">
            {children}
        </span>
    );
}