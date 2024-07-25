import { TimeInterval } from '../../time-interval/time-interval';
import { AttackEvent } from '../attack-event';

describe('Attack event', () => {
  describe('time of hits', () => {
    it('returns correct time of hits, when  hit count is defined as fixed', () => {
      const attackEvent = newAttackEvent({ numberOfHitsFixed: 5 });
      const expectedTimeOfHits = [0, 1000, 2000, 3000, 4000];
      expect(attackEvent.timeOfHits).toEqual(expectedTimeOfHits);
    });

    it('returns correct time of hits, when  hit count is defined per second', () => {
      const attackEvent = newAttackEvent({ numberOfHitsPerSecond: 2 });
      const expectedTimeOfHits = [
        0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
      ];
      expect(attackEvent.timeOfHits).toEqual(expectedTimeOfHits);
    });

    function newAttackEvent(hitCount: AttackEvent['hitCount']) {
      return new AttackEvent(
        new TimeInterval(0, 5000),
        0,
        '',
        'Altered',
        {} as AttackEvent['damageModifiers'],
        'normal',
        hitCount,
        [],
        false,
        true,
        {} as AttackEvent['weapon']
      );
    }
  });
});
