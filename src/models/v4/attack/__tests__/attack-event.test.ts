import { mock } from 'jest-mock-extended';

import type { AttackType } from '../../../../definitions/attack-type';
import type { WeaponElementalType } from '../../../../definitions/elemental-type';
import type { Weapon as WeaponDefinition } from '../../../../definitions/types/weapon/weapon';
import { Weapon } from '../../../weapon';
import type { AbilityUpdatesResource } from '../../ability/ability-updates-resource';
import type { CurrentCombatState } from '../../combat-state/current-combat-state';
import type { BaseDamageModifiersDefinition } from '../../damage-modifiers/base-damage-modifiers-definition';
import type { FinalDamageModifiersDefinition } from '../../damage-modifiers/final-damage-modifiers-definition';
import type { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import { TimeInterval } from '../../time-interval/time-interval';
import { AttackEvent } from '../attack-event';
import type { AttackHitCount } from '../attack-hit-count';

let timeInterval: TimeInterval;
const abilityId = 'id';
const cooldown = 1500;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentCombatState: CurrentCombatState;
const elementalType: WeaponElementalType = 'Volt';
let baseDamageModifiersDefinition: BaseDamageModifiersDefinition;
let finalDamageModifiersDefinition: FinalDamageModifiersDefinition;
const type: AttackType = 'normal';
let hitCount: AttackHitCount;
let weapon: Weapon;
let sut: AttackEvent;

describe('Attack event', () => {
  beforeEach(() => {
    timeInterval = new TimeInterval(0, 5000);
    updatesResources = [];
    eventManager = mock<EventManager>();
    currentTick = new CurrentTick(0, 500);
    currentCombatState = mock<CurrentCombatState>();
    baseDamageModifiersDefinition = {
      attackFlat: 252,
      attackMultiplier: 1.2,
      damageDealtIsPerSecond: false,
    };
    finalDamageModifiersDefinition = {};
    hitCount = { numberOfHitsFixed: 3 };
    weapon = new Weapon({ id: 'Meryl' } as WeaponDefinition);

    sut = new AttackEvent(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick,
      currentCombatState,
      elementalType,
      baseDamageModifiersDefinition,
      finalDamageModifiersDefinition,
      type,
      hitCount,
      weapon
    );
  });

  /* Ability event abstract class functionality tests below */

  it('returns correctly if it is on cooldown', () => {
    expect(sut.isOnCooldown(0)).toBe(true);
    expect(sut.isOnCooldown(1000)).toBe(true);
    expect(sut.isOnCooldown(1499)).toBe(true);
    expect(sut.isOnCooldown(1500)).toBe(false);
    expect(sut.isOnCooldown(2000)).toBe(false);
  });

  it('should publish ability end if the end time of this event is in the current tick', () => {
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
      id: abilityId,
    });
  });

  describe('request resource updates', () => {
    it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a flat amount for the duration of the attack event', () => {
      updatesResources.push({ resourceId: 'resource-id', amount: 100 });
      sut.process();

      expect(eventManager.publishResourceUpdateRequest).toHaveBeenCalledWith({
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
      sut.process();

      expect(eventManager.publishResourceUpdateRequest).toHaveBeenCalledWith({
        id: 'resource-id',
        amount: 100, // Tick is 1/2 of the duration of 1 second, so 200 / 2 = 100
        hasPriority: false,
      });
    });

    it('should request resource deletion', () => {
      updatesResources.push({
        resourceId: 'resource-id',
        depleteResource: true,
      });
      sut.process();

      expect(eventManager.publishResourceDepleteRequest).toHaveBeenCalledWith({
        id: 'resource-id',
      });
    });
  });
});
