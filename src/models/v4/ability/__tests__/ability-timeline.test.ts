import { TimeInterval } from '../../time-interval/time-interval';
import { AbilityEvent } from '../ability-event';
import { AbilityTimeline } from '../ability-timeline';

describe('Ability timeline', () => {
  describe('has event on cooldown', () => {
    let sut: AbilityTimeline;

    beforeEach(() => {
      sut = new AbilityTimeline(100);
    });

    it('should return false if there are no events', () => {
      expect(sut.hasEventOnCooldownAt(0)).toBe(false);
    });

    it('should return true if there is an event with cooldown', () => {
      sut.addEvent(new AbilityEvent(new TimeInterval(0, 10), 5));
      expect(sut.hasEventOnCooldownAt(0)).toBe(true);
    });

    it('should return false if there are no events on cooldown', () => {
      sut.addEvent(new AbilityEvent(new TimeInterval(0, 10), 0));
      sut.addEvent(new AbilityEvent(new TimeInterval(10, 20), 5));
      expect(sut.hasEventOnCooldownAt(0)).toBe(false);
    });
  });
});
