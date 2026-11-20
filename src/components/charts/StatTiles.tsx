export interface StatTile {
    label: string;
    value: string;
}

export default function StatTiles({ tiles }: { tiles: StatTile[] }) {
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