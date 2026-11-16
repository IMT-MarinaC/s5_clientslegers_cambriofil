import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import type { ContractScore } from '../../game/heistStats';
import ChartCard from './ChartCard';
import { AXIS_TICK, shortenLabel, TOOLTIP_STYLE } from './chartTheme';

export default function ScoreByContractChart({ data }: { data: ContractScore[] }) {
    const rows = data.map((score) => ({ label: score.name, value: `${score.succeeded} réussi(s), ${score.failed} raté(s)` }));

    return (
        <ChartCard title="Contrats réussis et ratés" question="Quels commanditaires je déçois le plus ?" rows={rows}>
            <BarChart data={data}>
                <CartesianGrid stroke="var(--ink-soft)" strokeDasharray="4 6" vertical={false} />
                <XAxis dataKey="name" interval={0} tickFormatter={shortenLabel} tick={AXIS_TICK} stroke="var(--ink)" />
                <YAxis allowDecimals={false} tick={AXIS_TICK} stroke="var(--ink)" width={32} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--highlighter)' }} />
                <Legend wrapperStyle={{ fontFamily: 'Patrick Hand, cursive' }} />
                <Bar
                    dataKey="succeeded"
                    name="Réussis"
                    stackId="heists"
                    fill="url(#fill-solid)"
                    stroke="var(--ink)"
                    strokeWidth={2} />
                <Bar
                    dataKey="failed"
                    name="Ratés"
                    stackId="heists"
                    fill="url(#fill-red-hatch)"
                    stroke="var(--red-pencil)"
                    strokeWidth={2} />
            </BarChart>
        </ChartCard>
    );
}