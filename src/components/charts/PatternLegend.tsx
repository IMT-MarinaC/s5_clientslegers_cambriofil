export interface LegendItem {
    label: string;
    fill: string;
    stroke: string;
}

// Légende maison : chaque carré reprend le motif ET le contour de sa série, sinon les hachures fines sont à peine visibles
export default function PatternLegend({ items }: { items: readonly LegendItem[] }) {
    return (
        <ul className="chart-legend">
            {items.map((item) => (
                <li key={item.label}>
                    <svg width="18" height="18" aria-hidden="true">
                        <rect x="1" y="1" width="16" height="16" fill={item.fill} stroke={item.stroke} strokeWidth="2" />
                    </svg>
                    {item.label}
                </li>
            ))}
        </ul>
    );
}