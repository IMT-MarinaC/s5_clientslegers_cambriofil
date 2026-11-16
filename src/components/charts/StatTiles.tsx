import type { HeistSummary } from '../../game/heistStats';
import { formatEuros } from '../../utils/format';

export default function StatTiles({ summary }: { summary: HeistSummary }) {
    const tiles = [
        { label: 'Casses', value: String(summary.count) },
        { label: 'Réussite', value: `${summary.successRate} %` },
        { label: 'Butin total', value: formatEuros(summary.totalLoot) },
        { label: 'Appels passés', value: String(summary.callsMade) },
    ];

    return (
        <dl className="stat-tiles">
            {tiles.map((tile) => (
                <div key={tile.label} className="sketch stat-tile">
                    <dt className="muted">{tile.label}</dt>
                    <dd className="typewriter">{tile.value}</dd>
                </div>
            ))}
        </dl>
    );
}