import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import type { Slice } from '../../utils/aggregate';
import ChartCard from './ChartCard';
import PatternLegend from './PatternLegend';
import { CHART_FILLS, TOOLTIP_STYLE } from './chartTheme';

export default function StolenByDepartmentChart({ data }: { data: Slice[] }) {
    const rows = data.map((slice) => ({ label: slice.name, value: `${slice.value} pièce(s)` }));
    const legendItems = data.map((slice, index) => ({
        label: slice.name,
        fill: CHART_FILLS[index % CHART_FILLS.length],
        stroke: 'var(--ink)',
    }));

    return (
        <ChartCard title="Ce que tu voles" question="Répartition des pièces de ta planque par département du musée" rows={rows}>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius="75%" stroke="var(--ink)" strokeWidth={2}>
                    {legendItems.map((item) => (
                        <Cell key={item.label} fill={item.fill} />
                    ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend content={() => <PatternLegend items={legendItems} />} />
            </PieChart>
        </ChartCard>
    );
}