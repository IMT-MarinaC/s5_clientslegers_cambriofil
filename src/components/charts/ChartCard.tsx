import type { ReactElement } from 'react';
import { ChevronDown } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
import { DEFAULT_CHART_HEIGHT } from './chartTheme';

export interface ChartRow {
    label: string;
    value: string;
}

interface ChartCardProps {
    title: string;
    question: string;
    rows: ChartRow[]; //Les mêmes données en texte, pour les lecteurs d'écran et les ptits curieux
    height?: number;
    wide?: boolean; // prend toute la largeur de la grille (une évolution dans le temps se lit mieux en large)
    children: ReactElement;
}

export default function ChartCard({ title, question, rows, height = DEFAULT_CHART_HEIGHT, wide = false, children }: ChartCardProps) {
    return (
        <figure className={wide ? 'sketch chart-card chart-card--wide' : 'sketch chart-card'}>
            <figcaption>
                <h3>{title}</h3>
                <p className="muted">{question}</p>
            </figcaption>
            {/* Le dessin est masqué aux lecteurs d'écran : les données leur sont lues dans le tableau */}
            <div aria-hidden="true">
                <ResponsiveContainer width="100%" height={height}>
                    {children}
                </ResponsiveContainer>
            </div>
            <details className="chart-card__data">
                <summary>
                    Voir les données
                    <ChevronDown aria-hidden="true" size={18} />
                </summary>
                <table>
                    <caption className="sr-only">{title}</caption>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td className="typewriter">{row.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </details>
        </figure>
    );
}