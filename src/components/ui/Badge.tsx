import type { Tone } from './tone';

interface BadgeProps {
    label: string;
    value: string;
    tone?: Tone;
}

export default function Badge({ label, value, tone }: BadgeProps) {
    return (
        <span className={tone ? `badge badge--${tone}` : 'badge'}>
            <span className="badge__label">{label}</span>
            <span className="typewriter">{value}</span>
        </span>
    );
}