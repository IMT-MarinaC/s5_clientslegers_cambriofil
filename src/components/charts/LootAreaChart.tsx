import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import type { Slice } from '../../utils/aggregate';
import { formatEuros } from '../../utils/format';
import ChartCard from './ChartCard';
import { AXIS_TICK, TOOLTIP_STYLE } from './chartTheme';

export default function LootAreaChart({ data }: { data: Slice[] }) {
    const rows = data.map((point) => ({ label: `Après le casse ${point.name}`, value: formatEuros(point.value) }));

    return (
        <ChartCard title="Ton butin au fil des casses" question="Est-ce que je m'enrichis ? Butin cumulé après chaque mission" rows={rows}>
            <AreaChart data={data}>
                <CartesianGrid stroke="var(--ink-soft)" strokeDasharray="4 6" vertical={false} />
                <XAxis dataKey="name" tick={AXIS_TICK} stroke="var(--ink)" />
                <YAxis tickFormatter={formatEuros} tick={AXIS_TICK} stroke="var(--ink)" width={64} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => formatEuros(Number(value))} />
                <Area type="monotone" dataKey="value" name="Butin" stroke="var(--ink)" strokeWidth={2} fill="url(#fill-hatch)" />
            </AreaChart>
        </ChartCard>
    );
}