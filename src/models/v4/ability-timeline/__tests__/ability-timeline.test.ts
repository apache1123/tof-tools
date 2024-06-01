import type { AbilityEvent } from '../ability-event';
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
      sut.addEvent(
        newFakeAbilityEvent({ startTime: 0, endTime: 10, cooldownEndsAt: 5 })
      );
      expect(sut.hasEventOnCooldownAt(0)).toBe(true);
      expect(sut.hasEventOnCooldownAt(2)).toBe(true);
      expect(sut.hasEventOnCooldownAt(5)).toBe(false);
      expect(sut.hasEventOnCooldownAt(10)).toBe(false);
    });
  });
});

function newFakeAbilityEvent({
  startTime,
  endTime,
  cooldownEndsAt,
}: Pick<
  AbilityEvent,
  'startTime' | 'endTime' | 'cooldownEndsAt'
>): AbilityEvent {
  return { startTime, endTime, cooldownEndsAt } as AbilityEvent;
}
