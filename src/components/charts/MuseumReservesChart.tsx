import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import type { DepartmentReserve } from '../../hooks/useMetQueries';
import ChartCard from './ChartCard';
import PatternLegend from './PatternLegend';
import { AXIS_TICK, formatCount, shortenLabel, TOOLTIP_CURSOR, TOOLTIP_STYLE } from './chartTheme';

const SERIES = [
    { dataKey: 'onView', label: 'Exposées', fill: 'url(#fill-solid)', stroke: 'var(--ink)' },
    { dataKey: 'inReserve', label: 'En réserve', fill: 'url(#fill-hatch)', stroke: 'var(--ink)' },
] as const;

export default function MuseumReservesChart({ data }: { data: DepartmentReserve[] }) {
    const rows = data.map((department) => ({
        label: department.name,
        value: `${formatCount(department.inReserve)} en réserve, ${formatCount(department.onView)} exposées`,
    }));

    return (
        <ChartCard
            title="Les réserves du musée"
            question="Œuvres en réserve et exposées par département : où frapper ensuite ?"
            rows={rows}
            height={440}
        >
            <BarChart data={data} layout="vertical">
                <XAxis type="number" tickFormatter={formatCount} tick={AXIS_TICK} stroke="var(--ink)" />
                <YAxis type="category" dataKey="name" width={120} tickFormatter={shortenLabel} tick={AXIS_TICK} stroke="var(--ink)" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={TOOLTIP_CURSOR} formatter={formatCount} />
                <Legend content={() => <PatternLegend items={SERIES} />} />
                {SERIES.map((series) => (
                    <Bar
                        key={series.dataKey}
                        dataKey={series.dataKey}
                        name={series.label}
                        stackId="museum"
                        fill={series.fill}
                        stroke={series.stroke}
                        strokeWidth={2} />
                ))}
            </BarChart>
        </ChartCard>
    );
}