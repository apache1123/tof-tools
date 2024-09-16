import { mock } from 'jest-mock-extended';

import type { CurrentCombatState } from '../../combat-state/current-combat-state';
import { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import { TimeInterval } from '../../time-interval/time-interval';
import { AbilityEvent } from '../ability-event';
import type { AbilityId } from '../ability-id';
import { AbilityTimeline } from '../ability-timeline';
import type { AbilityUpdatesResource } from '../ability-updates-resource';

let sut: AbilityTimeline;

let abilityId: AbilityId;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentCombatState: CurrentCombatState;

describe('Ability timeline', () => {
  beforeEach(() => {
    sut = new AbilityTimeline(100);

    abilityId = 'id';
    updatesResources = [];
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 100);
    currentCombatState = mock<CurrentCombatState>();
  });

  describe('has event on cooldown', () => {
    it('should return false if there are no events', () => {
      expect(sut.hasEventOnCooldownAt(0)).toBe(false);
    });

    it('should return true if there is an event with cooldown', () => {
      sut.addEvent(
        new AbilityEvent(
          new TimeInterval(0, 10),
          abilityId,
          5,
          updatesResources,
          eventManager,
          currentTick,
          currentCombatState
        )
      );
      expect(sut.hasEventOnCooldownAt(0)).toBe(true);
    });

    it('should return false if there are no events on cooldown', () => {
      sut.addEvent(
        new AbilityEvent(
          new TimeInterval(0, 10),
          abilityId,
          0,
          updatesResources,
          eventManager,
          currentTick,
          currentCombatState
        )
      );
      sut.addEvent(
        new AbilityEvent(
          new TimeInterval(10, 20),
          abilityId,
          5,
          updatesResources,
          eventManager,
          currentTick,
          currentCombatState
        )
      );
      expect(sut.hasEventOnCooldownAt(0)).toBe(false);
    });
  });
});
