import { Link } from 'react-router';
import type { MetObject } from '../../api/types';
import type { Clue } from '../../game/clue';
import type { Contract } from '../../game/contracts';
import type { HeistRecord } from '../../game/history';
import { formatEuros } from '../../utils/format';
import ArtworkImage from '../artwork/ArtworkImage';

interface ResultProps {
    contract: Contract;
    heist: HeistRecord;
    stolen: MetObject;
    target: MetObject;
    failedClues: Clue[];
    notedCount: number; // lignes lisibles dans le carnet au moment du vol
    totalClues: number;
    totalLoot: number;
    onReplay: () => void;
}

export default function Result(props: ResultProps) {
    const { contract, heist, stolen, target, failedClues, notedCount, totalClues, totalLoot, onReplay } = props;

    return (
        <section className="sketch sketch--overshoot result" aria-live="polite">
            <p className="muted typewriter">Contrat de {contract.client} · {contract.title}</p>
            <h1>{heist.success ? 'Contrat rempli !' : 'Mauvaise pioche…'}</h1>

            {heist.success ? (
                <>
                    <p>{contract.client} te verse <strong className="typewriter">{formatEuros(heist.reward)}</strong>.</p>
                    <div className="result__photo result__photo--target tape">
                        <ArtworkImage src={target.primaryImageSmall} alt={target.title} surveillance={false} />
                    </div>
                </>
            ) : (
                <>
                    <p>
                        {contract.client} refuse la pièce : pas de prime. « {heist.artwork.title} » finit dans ta planque,{' '}
                        <span className="danger">invendable</span>.
                    </p>
                    <div className="result__compare">
                        <figure>
                            <figcaption className="muted">Ce que tu as volé</figcaption>
                            <div className="result__photo result__photo--wrong tape">
                                <ArtworkImage src={stolen.primaryImageSmall} alt={stolen.title} surveillance={false} />
                            </div>
                        </figure>
                        <figure>
                            <figcaption className="muted">Ce qu'il voulait</figcaption>
                            <div className="result__photo result__photo--target tape">
                                <ArtworkImage src={target.primaryImageSmall} alt={target.title} surveillance={false} />
                            </div>
                        </figure>
                    </div>
                    <p className="muted">
                        Ton carnet affichait {notedCount} critères sur {totalClues}. Il fallait une pièce {failedClues[0].text}.
                    </p>
                </>
            )}

            <p>Butin total : <strong className="highlight typewriter">{formatEuros(totalLoot)}</strong></p>
            <div className="result__actions">
                <button type="button" className="btn btn--primary" onClick={onReplay}>
                    {heist.success ? 'Nouvelle mission' : 'Retenter une mission'}
                </button>
                <Link to="/" className="btn">Autres contrats</Link>
                <Link to="/planque" className="btn">Voir ma planque</Link>
            </div>
        </section>
    );
}