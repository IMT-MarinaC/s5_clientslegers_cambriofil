import { findContract } from '../../game/contracts';
import type { HeistRecord } from '../../game/history';
import { formatDate, formatEuros } from '../../utils/format';

export default function StolenHistory({ heists }: { heists: HeistRecord[] }) {
    if (heists.length === 0) return null;

    return (
        <section className="sketch stolen-history" aria-labelledby="stolen-history-title">
            <h2 id="stolen-history-title">Dans ta planque</h2>
            <ul>
                {heists.map((heist) => (
                    <li key={heist.id}>
                        Volée le <span className="typewriter">{formatDate(heist.date)}</span> pour{' '}
                        {findContract(heist.contractId)?.client ?? 'un commanditaire'} :{' '}
                        {heist.success ? (
                            <>livrée, <strong className="highlight typewriter">{formatEuros(heist.reward)}</strong></>
                        ) : (
                            <span className="danger">invendable</span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}