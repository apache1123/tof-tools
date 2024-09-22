import { EventManager } from '../../event/event-manager';
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
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 500, eventManager);

    resetSut();
  });

  function resetSut() {
    sut = new ConcreteAbilityEvent(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick
    );
    sut.subscribeToEvents();
  }

  it('returns correctly if it is on cooldown', () => {
    expect(sut.isOnCooldown(0)).toBe(true);
    expect(sut.isOnCooldown(1000)).toBe(true);
    expect(sut.isOnCooldown(1499)).toBe(true);
    expect(sut.isOnCooldown(1500)).toBe(false);
    expect(sut.isOnCooldown(2000)).toBe(false);
  });

  it('should publish ability end if the end time of this event is in the current tick', () => {
    sut.endTime = 1000;
    const spy = jest.spyOn(eventManager, 'publishAbilityEnded');
    // 0-500 tick
    currentTick.advance();
    expect(spy).not.toHaveBeenCalled();

    // 500-1000 tick
    currentTick.advance();
    expect(spy).not.toHaveBeenCalled();

    // 1000-1500 tick (endTime 1000 is inclusive in 1000-1500 tick but not 500-1000 tick)
    currentTick.advance();
    expect(spy).toHaveBeenCalledWith({
      id: sut.abilityId,
    });
  });

  describe('request resource updates', () => {
    let publishResourceUpdateSpy: jest.SpyInstance;
    let publishResourceDepleteSpy: jest.SpyInstance;

    beforeEach(() => {
      publishResourceUpdateSpy = jest.spyOn(
        eventManager,
        'publishResourceUpdateRequest'
      );
      publishResourceDepleteSpy = jest.spyOn(
        eventManager,
        'publishResourceDepleteRequest'
      );
    });

    it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a flat amount for the duration of the attack event', () => {
      updatesResources.push({ resourceId: 'resource-id', amount: 100 });
      currentTick.advance();

      expect(publishResourceUpdateSpy).toHaveBeenCalledWith({
        id: 'resource-id',
        amount: 10, // Tick is 1/10 of the duration of the attack event, so 100 / 10 = 20
        hasPriority: false,
      });
    });

    it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a per second amount', () => {
      updatesResources.push({
        resourceId: 'resource-id',
        amountPerSecond: 200,
      });
      currentTick.advance();

      expect(publishResourceUpdateSpy).toHaveBeenCalledWith({
        id: 'resource-id',
        amount: 100, // Tick is 1/2 of the duration of 1 second, so 200 / 2 = 100
        hasPriority: false,
      });
    });

    it('should request resource depletion', () => {
      updatesResources.push({
        resourceId: 'resource-id',
        depleteResource: true,
      });
      currentTick.advance();

      expect(publishResourceDepleteSpy).toHaveBeenCalledWith({
        id: 'resource-id',
      });
    });
  });

  it('should unsubscribe itself from tick advancing event updates when it ends', () => {
    sut.endTime = 1000;
    const spy = jest.spyOn(eventManager, 'unsubscribeToTickAdvancing');

    // 0 time
    currentTick.advance();

    // 500
    expect(spy).not.toHaveBeenCalled();
    currentTick.advance();

    // 1000
    expect(spy).not.toHaveBeenCalled();
    currentTick.advance();

    // 1500
    expect(spy).toHaveBeenCalledOnce();
  });
});
