import type { MockProxy } from 'jest-mock-extended';
import { mock } from 'jest-mock-extended';

import { repeat } from '../../../../utils/test-utils';
import type { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import type { Ability } from '../ability';
import { ConcreteAbility } from '../ability';
import type { AbilityEvent } from '../ability-event';
import type { AbilityId } from '../ability-id';
import type { AbilityRequirements } from '../ability-requirements';
import { AbilityTimeline } from '../ability-timeline';
import type { AbilityUpdatesResource } from '../ability-updates-resource';

let id: AbilityId;
let displayName: string;
let cooldown: number;
let duration: number | undefined;
let canBePlayerTriggered: boolean;
let requirements: MockProxy<AbilityRequirements>;
let updatesResources: AbilityUpdatesResource[];
let timeline: AbilityTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;

let sut: Ability;

describe('Ability', () => {
  beforeEach(() => {
    id = 'id';
    displayName = 'displayName';
    cooldown = 1999;
    duration = 5000;
    canBePlayerTriggered = true;

    requirements = mock<AbilityRequirements>();
    requirements.haveBeenMet.mockReturnValue(true);

    updatesResources = [];
    timeline = new AbilityTimeline(100000);
    eventManager = mock<EventManager>();
    currentTick = new CurrentTick(0, 1000);

    resetSut();
  });

  function resetSut() {
    sut = new ConcreteAbility(
      id,
      displayName,
      cooldown,
      duration,
      canBePlayerTriggered,
      requirements,
      updatesResources,
      timeline,
      eventManager,
      currentTick
    );
  }

  describe('Can trigger', () => {
    it('returns false when there is an event on cooldown', () => {
      expect(sut.canTrigger()).toBe(true);
      sut.trigger();
      expect(sut.canTrigger()).toBe(false);

      currentTick.advance(); // -> 1000 - 2000
      expect(sut.canTrigger()).toBe(false);

      currentTick.advance(); // -> 2000 - 3000
      expect(sut.canTrigger()).toBe(true);
    });

    it('returns false when requirements are not met', () => {
      // Requirements class tested in its own tests
      requirements.haveBeenMet.mockReturnValue(false);
      expect(sut.canTrigger()).toBe(false);
    });
  });

  describe('Trigger', () => {
    it('should create a new timeline event with a fixed duration if the duration is defined', () => {
      sut.trigger();
      expect(timeline.events[0].duration).toBe(5000);
    });

    it("should create a new timeline event with its end time set to the timeline's end time if the duration is undefined", () => {
      duration = undefined;
      resetSut();
      sut.trigger();
      expect(timeline.events[0].duration).toBe(100000);
    });

    it('should publish the ability started event', () => {
      sut.trigger();
      expect(eventManager.publishAbilityStarted).toHaveBeenCalledWith({
        id,
      });
    });

    it('should do nothing if ability cannot be triggered', () => {
      requirements.haveBeenMet.mockReturnValue(false);
      sut.trigger();
      expect(timeline.events.length).toBe(0);
      expect(eventManager.publishAbilityStarted).not.toHaveBeenCalled();
    });
  });

  describe('Is ongoing', () => {
    it('should return true if there is an ongoing event', () => {
      expect(sut.isOngoing()).toBe(false);
      sut.trigger();
      expect(sut.isOngoing()).toBe(true);

      // Ticks 1000-2000,2000-3000,3000-4000,4000-5000
      repeat(() => {
        currentTick.advance();
        expect(sut.isOngoing()).toBe(true);
      }, 4);

      currentTick.advance(); // 5000-6000
      expect(sut.isOngoing()).toBe(false);
    });
  });

  describe('Process', () => {
    it('should terminate an ongoing timeline event if the requirements are no longer met', () => {
      sut.trigger();
      sut.process();

      currentTick.advance(); // -> 1000-2000
      sut.process();
      expect(sut.isOngoing()).toBe(true);

      currentTick.advance(); // -> 2000-3000
      requirements.haveBeenMet.mockReturnValue(false);
      sut.process();
      expect(sut.isOngoing()).toBe(true);

      currentTick.advance(); // -> 3000-4000
      expect(sut.isOngoing()).toBe(false);
    });

    it('should call process() on all ongoing timeline events', () => {
      const event1 = mock<AbilityEvent>({ startTime: 0, endTime: 10000 });
      const event2 = mock<AbilityEvent>({ startTime: 1000, endTime: 11000 });

      timeline.addEvent(event1);
      timeline.addEvent(event2);

      sut.process();
      expect(event1.process).toHaveBeenCalledTimes(1);

      currentTick.advance(); // -> 1000-2000
      sut.process();
      expect(event1.process).toHaveBeenCalledTimes(2);
      expect(event2.process).toHaveBeenCalledTimes(1);
    });
  });
});