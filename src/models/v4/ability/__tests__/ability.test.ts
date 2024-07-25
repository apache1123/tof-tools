import mock from 'jest-mock-extended/lib/Mock';

import { TickTracker } from '../../tick-tracker';
import { TimeInterval } from '../../time-interval/time-interval';
import { Timeline } from '../../timeline/timeline';
import { Ability } from '../ability';
import type { AbilityDefinition } from '../ability-definition';
import { AbilityEvent } from '../ability-event';

describe('Ability', () => {
  describe('cooldown', () => {
    let timeline: Timeline<AbilityEvent>;
    let tickTracker: TickTracker;
    let sut: Ability;

    beforeEach(() => {
      timeline = new Timeline<AbilityEvent>(100);
      tickTracker = new TickTracker(new TimeInterval(0, 10), 10);

      sut = new Ability(mock<AbilityDefinition>(), timeline, tickTracker);
    });

    it('should not be on cooldown if there are no events', () => {
      expect(sut.isOnCooldown()).toBe(false);
    });

    it('should be on cooldown of there is an event with cooldown', () => {
      timeline.addEvent(new AbilityEvent(new TimeInterval(0, 10), 5));
      expect(sut.isOnCooldown()).toBe(true);
    });

    it('should not be on cooldown if there are no events on cooldown', () => {
      timeline.addEvent(new AbilityEvent(new TimeInterval(0, 10), 0));
      timeline.addEvent(new AbilityEvent(new TimeInterval(10, 20), 5));
      expect(sut.isOnCooldown()).toBe(false);
    });
  });
});
