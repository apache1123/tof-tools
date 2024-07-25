import { TimeInterval } from '../../time-interval/time-interval';
import { AbilityEvent } from '../ability-event';
import { AbilityTimeline } from '../ability-timeline';

describe('Ability timeline', () => {
  const timelineDuration = 100;

  describe('ability cooldowns', () => {
    it('should not be on cooldown if there are no events', () => {
      const sut = new AbilityTimeline(timelineDuration);
      expect(sut.hasEventOnCooldownAt(0)).toBe(false);
    });

    it('should be on cooldown of there is an event with cooldown', () => {
      const sut = new AbilityTimeline(timelineDuration);
      sut.addEvent(newAbilityEvent({ startTime: 0, endTime: 10, cooldown: 5 }));
      expect(sut.hasEventOnCooldownAt(0)).toBe(true);
      expect(sut.hasEventOnCooldownAt(2)).toBe(true);
      expect(sut.hasEventOnCooldownAt(5)).toBe(false);
      expect(sut.hasEventOnCooldownAt(10)).toBe(false);
    });

    function newAbilityEvent({
      startTime,
      endTime,
      cooldown,
    }: Pick<AbilityEvent, 'startTime' | 'endTime' | 'cooldown'>): AbilityEvent {
      return new AbilityEvent(new TimeInterval(startTime, endTime), cooldown);
    }
  });
});
