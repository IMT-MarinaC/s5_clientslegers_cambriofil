import { MISSION_POOL } from '../tests/fixtures';
import { buildMission, ROOM_SIZE } from './buildMission';
import { matchesAllClues } from './clue';

describe('buildMission', () => {
    it('place la cible parmi 6 œuvres, avec une seule bonne réponse', () => {
        const mission = buildMission(MISSION_POOL, ['medium', 'century']);
        expect(mission).not.toBeNull();
        expect(mission!.candidates).toHaveLength(ROOM_SIZE);
        expect(mission!.candidates).toContain(mission!.target);
        expect(mission!.candidates.filter((a) => matchesAllClues(a, mission!.clues))).toHaveLength(1);
    });

    it('renvoie null si le lot est trop petit', () => {
        expect(buildMission(MISSION_POOL.slice(0, 3), ['medium', 'century'])).toBeNull();
    });
});