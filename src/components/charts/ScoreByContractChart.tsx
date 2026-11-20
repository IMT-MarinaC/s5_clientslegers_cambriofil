import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import type { ContractScore } from '../../game/heistStats';
import ChartCard from './ChartCard';
import PatternLegend from './PatternLegend';
import { AXIS_TICK, shortenLabel, TOOLTIP_CURSOR, TOOLTIP_STYLE } from './chartTheme';

const SERIES = [
    { dataKey: 'succeeded', label: 'Réussis', fill: 'url(#fill-solid)', stroke: 'var(--ink)' },
    { dataKey: 'failed', label: 'Ratés', fill: 'url(#fill-red-hatch)', stroke: 'var(--red-pencil)' },
] as const;

export default function ScoreByContractChart({ data }: { data: ContractScore[] }) {
    const rows = data.map((score) => ({ label: score.name, value: `${score.succeeded} réussi(s), ${score.failed} raté(s)` }));

    return (
        <ChartCard title="Contrats réussis et ratés" question="Quels commanditaires je déçois le plus ?" rows={rows}>
            <BarChart data={data}>
                <CartesianGrid stroke="var(--ink-soft)" strokeDasharray="4 6" vertical={false} />
                <XAxis dataKey="name" interval={0} tickFormatter={shortenLabel} tick={AXIS_TICK} stroke="var(--ink)" />
                <YAxis allowDecimals={false} tick={AXIS_TICK} stroke="var(--ink)" width={32} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={TOOLTIP_CURSOR} />
                <Legend content={() => <PatternLegend items={SERIES} />} />
                {SERIES.map((series) => (
                    <Bar
                        key={series.dataKey}
                        dataKey={series.dataKey}
                        name={series.label}
                        stackId="heists"
                        fill={series.fill}
                        stroke={series.stroke}
                        strokeWidth={2} />
                ))}
            </BarChart>
        </ChartCard>
    );
}