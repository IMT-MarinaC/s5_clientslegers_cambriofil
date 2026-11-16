import { findContract } from '../../game/contracts';
import type { BurglaryRecord } from '../../game/history';
import { formatDate, formatEuros } from '../../utils/format';

export default function StolenHistory({ burglaries }: { burglaries: BurglaryRecord[] }) {
    if (burglaries.length === 0) return null;

    return (
        <section className="sketch stolen-history" aria-labelledby="stolen-history-title">
            <h2 id="stolen-history-title">Dans ta planque</h2>
            <ul>
                {burglaries.map((burglary) => (
                    <li key={burglary.id}>
                        Volée le <span className="typewriter">{formatDate(burglary.date)}</span> pour{' '}
                        {findContract(burglary.contractId)?.client ?? 'un commanditaire'} :{' '}
                        {burglary.success ? (
                            <>livrée, <strong className="highlight typewriter">{formatEuros(burglary.reward)}</strong></>
                        ) : (
                            <span className="danger">invendable</span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}