import {useState} from 'react';
import type {MetObject} from '../../api/types';
import type {Contract} from '../../game/contracts';
import {buildMission} from '../../game/buildMission';
import {type Clue, getFailedClues} from '../../game/clue';
import {type HeistRecord, createHeistRecord} from '../../game/history';
import {computeReward, FREE_NOTES} from '../../game/reward';
import {useHeistHistory} from '../../hooks/useHeistHistory.ts';
import ErrorMessage from '../ui/ErrorMessage';
import Briefing from './Briefing';
import Room from './Room';
import Result from './Result';

type Phase = 'briefing' | 'room' | 'result';

interface Outcome {
    heist: HeistRecord;
    stolen: MetObject;
    failedClues: Clue[];
}

interface MissionGameProps {
    contract: Contract;
    pool: MetObject[];
    onReplay: () => void;
}

export default function MissionGame({ contract, pool, onReplay }: MissionGameProps) {
    const [mission] = useState(() => buildMission(pool, contract.clueTypes));
    const [phase, setPhase] = useState<Phase>('briefing');
    const [revealedCount, setRevealedCount] = useState(FREE_NOTES);
    const [outcome, setOutcome] = useState<Outcome | null>(null);
    const { addHeist, totalLoot } = useHeistHistory();

    if (!mission) {
        return <ErrorMessage message="Pas assez de pièces dans cette salle. Retente ta chance." onRetry={onReplay} />;
    }

    const callsMade = revealedCount - FREE_NOTES;
    const reward = computeReward(contract.reward, callsMade);

    const handleSteal = (artwork: MetObject) => {
        const failedClues = getFailedClues(artwork, mission.clues);
        const heist = createHeistRecord({ contractId: contract.id, artwork, reward, callsMade, failedClues });
        addHeist(heist);
        setOutcome({ heist, stolen: artwork, failedClues });
        setPhase('result');
    };

    if (phase === 'briefing') {
        return <Briefing contract={contract} clues={mission.clues} onReady={() => setPhase('room')} />;
    }
    if (phase === 'room' || !outcome) {
        return (
            <Room
                candidates={mission.candidates}
                clues={mission.clues}
                revealedCount={revealedCount}
                reward={reward}
                onCall={() => setRevealedCount((count) => count + 1)}
                onSteal={handleSteal}
            />
        );
    }
    return (
        <Result
            contract={contract}
            heist={outcome.heist}
            stolen={outcome.stolen}
            target={mission.target}
            failedClues={outcome.failedClues}
            notedCount={revealedCount}
            totalClues={mission.clues.length}
            totalLoot={totalLoot}
            onReplay={onReplay}
        />
    );
}