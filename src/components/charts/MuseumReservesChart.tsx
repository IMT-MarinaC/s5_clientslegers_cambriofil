import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { Slice } from '../../utils/aggregate';
import ChartCard from './ChartCard';
import { AXIS_TICK, formatCount, shortenLabel, TOOLTIP_STYLE } from './chartTheme';

export default function MuseumReservesChart({ data }: { data: Slice[] }) {
    const rows = data.map(
        (slice) => (
            { label: slice.name, value: `${formatCount(slice.value)} œuvres` })
        );

    return (
        <ChartCard
            title="Les réserves du musée"
            question="Œuvres photographiées par département : où frapper ensuite ?"
            rows={rows}
            height={420}
        >
            <BarChart data={data} layout="vertical">
                <XAxis type="number" tickFormatter={formatCount} tick={AXIS_TICK} stroke="var(--ink)" />
                <YAxis type="category" dataKey="name" width={120} tickFormatter={shortenLabel} tick={AXIS_TICK} stroke="var(--ink)" />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={formatCount} />
                <Bar dataKey="value" name="Œuvres" fill="url(#fill-hatch)" stroke="var(--ink)" strokeWidth={2} />
            </BarChart>
        </ChartCard>
    );
}