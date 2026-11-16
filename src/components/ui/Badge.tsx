interface BadgeProps {
    label: string;
    value: string;
    danger?: boolean;
}

export default function Badge({ label, value, danger = false }: BadgeProps) {
    return (
        <span className={danger ? 'badge badge--danger' : 'badge'}>
            <span className="badge__label">{label}</span>
            <span className="typewriter">{value}</span>
        </span>
    );
}