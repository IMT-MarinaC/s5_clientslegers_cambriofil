import type { ReactNode } from 'react';

interface EmptyStateProps {
    title: string;
    children: ReactNode;
    action?: ReactNode;
}

export default function EmptyState({ title, children, action }: EmptyStateProps) {
    return (
        <div className="sketch sketch--overshoot empty-state">
            <h2>{title}</h2>
            <p className="muted">{children}</p>
            {action}
        </div>
    );
}