import type { ReactNode } from 'react';
import type { Tone } from './tone';

interface StampProps {
    tone: Tone;
    children: ReactNode;
}

export default function Stamp({ tone, children }: StampProps) {
    return (
        <span className={`stamp stamp--${tone}`} aria-hidden="true">
            {children}
        </span>
    );
}