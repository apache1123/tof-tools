import { mock } from 'jest-mock-extended';

import type { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import { TimeInterval } from '../../time-interval/time-interval';
import type { AbilityEvent } from '../ability-event';
import { ConcreteAbilityEvent } from '../ability-event';
import type { AbilityId } from '../ability-id';
import type { AbilityUpdatesResource } from '../ability-updates-resource';

// Ability event dependencies / properties
let timeInterval: TimeInterval;
let abilityId: AbilityId;
let cooldown: number;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;

let sut: AbilityEvent;

describe('Ability event', () => {
  beforeEach(() => {
    timeInterval = new TimeInterval(0, 5000);
    abilityId = 'id';
    cooldown = 1500;
    updatesResources = [];
    eventManager = mock<EventManager>();
    currentTick = new CurrentTick(0, 500);

    sut = new ConcreteAbilityEvent(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick
    );
  });

  it('returns correctly if it is on cooldown', () => {
    cooldownTest(sut);
  });

  it('should publish ability end if the end time of this event is in the current tick', () => {
    publishAbilityEndTest(sut, currentTick, eventManager);
  });

  describe('request resource updates', () => {
    it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a flat amount for the duration of the attack event', () => {
      requestResourceUpdateFlatAmountTest(sut, updatesResources, eventManager);
    });

    it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a per second amount', () => {
      requestResourceUpdatePerSecondAmountTest(
        sut,
        updatesResources,
        eventManager
      );
    });

    it('should request resource deletion', () => {
      requestResourceDepletionTest(sut, updatesResources, eventManager);
    });
  });
});

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
