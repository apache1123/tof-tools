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
  });

  describe('ending events', () => {
    it('should not end any events if there are no events', () => {
      const sut = new AbilityTimeline(timelineDuration);
      sut.endAnyEventsAt(0);
      expect(sut.events).toHaveLength(0);
    });

    it('should end any events that overlap with the time', () => {
      const sut = new AbilityTimeline(timelineDuration);
      sut.addEvent(newAbilityEvent({ startTime: 0, endTime: 10, cooldown: 5 }));

      sut.endAnyEventsAt(5);

      const events = sut.events;
      expect(events[0].startTime).toBe(0);
      expect(events[0].endTime).toBe(5);
    });

    it('should not end any events that do not overlap with the time', () => {
      const sut = new AbilityTimeline(timelineDuration);
      sut.addEvent(newAbilityEvent({ startTime: 0, endTime: 10, cooldown: 5 }));
      sut.addEvent(
        newAbilityEvent({ startTime: 20, endTime: 30, cooldown: 5 })
      );

      sut.endAnyEventsAt(15);

      const events = sut.events;
      expect(events[0].startTime).toBe(0);
      expect(events[0].endTime).toBe(10);
      expect(events[1].startTime).toBe(20);
      expect(events[1].endTime).toBe(30);
    });

    it('should remove an event if ending that event at the specified time will cause it to have a zero duration', () => {
      const sut = new AbilityTimeline(timelineDuration);
      sut.addEvent(
        newAbilityEvent({ startTime: 10, endTime: 20, cooldown: 5 })
      );

      sut.endAnyEventsAt(10);

      const events = sut.events;
      expect(events).toHaveLength(0);
    });
  });
});

function newAbilityEvent({
  startTime,
  endTime,
  cooldown,
}: Pick<AbilityEvent, 'startTime' | 'endTime' | 'cooldown'>): AbilityEvent {
  return new AbilityEvent(new TimeInterval(startTime, endTime), cooldown);
}
