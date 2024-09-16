import { mock } from 'jest-mock-extended';

import type { CurrentCombatState } from '../../combat-state/current-combat-state';
import type { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import { TimeInterval } from '../../time-interval/time-interval';
import type { AbilityEvent } from '../ability-event';
import type { AbilityId } from '../ability-id';
import type { AbilityUpdatesResource } from '../ability-updates-resource';

/** Ability event abstract class tests to be re-used in child class tests */

// Ability event dependencies / properties needed in constructor
export const createTimeInterval = () => new TimeInterval(0, 5000);
export const createAbilityId = (): AbilityId => 'id';
export const createCooldown = () => 1500;
export const createUpdatesResources = (): AbilityUpdatesResource[] => [];
export const createEventManager = () => mock<EventManager>();
export const createCurrentTick = () => new CurrentTick(0, 500);
export const createCurrentCombatState = () => mock<CurrentCombatState>();

export function cooldownTest(sut: AbilityEvent) {
  expect(sut.isOnCooldown(0)).toBe(true);
  expect(sut.isOnCooldown(1000)).toBe(true);
  expect(sut.isOnCooldown(1499)).toBe(true);
  expect(sut.isOnCooldown(1500)).toBe(false);
  expect(sut.isOnCooldown(2000)).toBe(false);
}

export function publishAbilityEndTest(
  sut: AbilityEvent,
  currentTick: CurrentTick,
  eventManager: EventManager
) {
  sut.endTime = 1000;
  // 0-500 tick
  sut.process();
  expect(eventManager.publishAbilityEnded).not.toHaveBeenCalled();

  currentTick.advance();
  // 500-1000 tick
  sut.process();
  expect(eventManager.publishAbilityEnded).not.toHaveBeenCalled();

  currentTick.advance();
  // 1000-1500 tick
  sut.process();
  expect(eventManager.publishAbilityEnded).toHaveBeenCalledWith({
    id: sut.abilityId,
  });
}

export function requestResourceUpdateFlatAmountTest(
  sut: AbilityEvent,
  updatesResources: AbilityUpdatesResource[],
  eventManager: EventManager
) {
  updatesResources.push({ resourceId: 'resource-id', amount: 100 });
  sut.process();

  expect(eventManager.publishResourceUpdateRequest).toHaveBeenCalledWith({
    id: 'resource-id',
    amount: 10, // Tick is 1/10 of the duration of the attack event, so 100 / 10 = 20
    hasPriority: false,
  });
}

export function requestResourceUpdatePerSecondAmountTest(
  sut: AbilityEvent,
  updatesResources: AbilityUpdatesResource[],
  eventManager: EventManager
) {
  updatesResources.push({
    resourceId: 'resource-id',
    amountPerSecond: 200,
  });
  sut.process();

  expect(eventManager.publishResourceUpdateRequest).toHaveBeenCalledWith({
    id: 'resource-id',
    amount: 100, // Tick is 1/2 of the duration of 1 second, so 200 / 2 = 100
    hasPriority: false,
  });
}

export function requestResourceDepletionTest(
  sut: AbilityEvent,
  updatesResources: AbilityUpdatesResource[],
  eventManager: EventManager
) {
  updatesResources.push({
    resourceId: 'resource-id',
    depleteResource: true,
  });
  sut.process();

  expect(eventManager.publishResourceDepleteRequest).toHaveBeenCalledWith({
    id: 'resource-id',
  });
}
