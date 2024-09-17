import type { MockProxy } from 'jest-mock-extended';
import { mock } from 'jest-mock-extended';

import type { AttackType } from '../../../../definitions/attack-type';
import type { WeaponElementalType } from '../../../../definitions/elemental-type';
import type { Weapon as WeaponDefinition } from '../../../../definitions/types/weapon/weapon';
import { Weapon } from '../../../weapon';
import type { AbilityId } from '../../ability/ability-id';
import type { AbilityUpdatesResource } from '../../ability/ability-updates-resource';
import type { BaseDamageModifiersDefinition } from '../../damage-modifiers/base-damage-modifiers-definition';
import type { FinalDamageModifiersDefinition } from '../../damage-modifiers/final-damage-modifiers-definition';
import type { EventManager } from '../../event/event-manager';
import type { CurrentResource } from '../../resource/current-resource/current-resource';
import type { CurrentResources } from '../../resource/current-resource/current-resources';
import { CurrentTick } from '../../tick/current-tick';
import { TimeInterval } from '../../time-interval/time-interval';
import { AttackEvent } from '../attack-event';
import type { AttackHitCount } from '../attack-hit-count';

let timeInterval: TimeInterval;
let abilityId: AbilityId;
let cooldown: number;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentResources: MockProxy<CurrentResources>;

let elementalType: WeaponElementalType;
let baseDamageModifiersDefinition: BaseDamageModifiersDefinition;
let finalDamageModifiersDefinition: FinalDamageModifiersDefinition;
let type: AttackType;
let hitCount: AttackHitCount;
let weapon: Weapon;

let sut: AttackEvent;

describe('Attack event', () => {
  beforeEach(() => {
    timeInterval = new TimeInterval(0, 500);
    abilityId = 'id';
    cooldown = 1500;
    updatesResources = [];
    eventManager = mock<EventManager>();
    currentTick = new CurrentTick(0, 500);
    currentResources = mock<CurrentResources>();

    elementalType = 'Volt';
    baseDamageModifiersDefinition = {
      damageDealtIsPerSecond: false,
      attackMultiplier: 1.2,
      attackFlat: 252,
      hpMultiplier: 0.3,
      sumOfResistancesMultiplier: 0.3,
      critRateFlatMultiplier: 0.3,
      resourceAmountMultiplier: {
        resourceId: 'resource-id',
        multiplier: 3,
      },
    };
    finalDamageModifiersDefinition = {};
    type = 'normal';
    hitCount = { numberOfHitsFixed: 3 };
    weapon = new Weapon({ id: 'Meryl' } as WeaponDefinition);

    resetSut();
  });

  function resetSut() {
    sut = new AttackEvent(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick,
      elementalType,
      baseDamageModifiersDefinition,
      finalDamageModifiersDefinition,
      type,
      hitCount,
      weapon,
      currentResources
    );
  }

  describe('Attack hits', () => {
    it('should publish attack hits if they are within the current tick', () => {
      // current tick 0-500, event 0-500, 3 hits
      sut.process();
      expect(eventManager.publishAttackHit).toHaveBeenCalledTimes(3);
    });

    describe('Attack hit timing', () => {
      it('should publish attack hits at the right time, for an attack with a fixed number of hits over its duration', () => {
        // current tick 0-500, event 0-500, 3 hits at 125, 250, 375
        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            time: 125,
          })
        );
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            time: 250,
          })
        );
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            time: 375,
          })
        );
      });

      it('should publish attack hits at the right time, for an attack with a number of hits over a second', () => {
        // current tick 0-500, event 0-500, 4 hits per second => 2 hits per 500ms => hits at 167, 333
        hitCount.numberOfHitsFixed = undefined;
        hitCount.numberOfHitsPerSecond = 4;
        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            time: 167,
          })
        );
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            time: 333,
          })
        );
      });
    });

    describe('Base damage modifiers', () => {
      it('should calculate the base damage modifiers correctly, for an attack where the damage dealt is defined to be for the whole event', () => {
        // current tick 0-500, event 0-500, 3 hits => applicable values should be divided by 3
        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            baseDamageModifiers: {
              attackMultiplier: 0.4,
              attackFlat: 84,
              hpMultiplier: 0.1,
              sumOfResistancesMultiplier: 0.1,
              critRateFlatMultiplier: 0.1,
              resourceAmountMultiplier: 1,
            },
          })
        );
      });

      it('should calculate the base damage modifiers correctly, for an attack where the damage dealt is defined to be per second (and the hits is defined to be for the whole attack)', () => {
        // current tick 0-500, event 0-500; event is half the duration of per second; 3 hits; Per hit, applicable values should be divided by (2 * 3) = 6
        baseDamageModifiersDefinition.damageDealtIsPerSecond = true;
        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            baseDamageModifiers: {
              attackMultiplier: 0.2,
              attackFlat: 42,
              hpMultiplier: 0.05,
              sumOfResistancesMultiplier: 0.05,
              critRateFlatMultiplier: 0.05,
              resourceAmountMultiplier: 1,
            },
          })
        );
      });

      it('should calculate the base damage modifiers correctly, for an attack where the damage dealt is defined to be per second (and the hits is defined to be per second)', () => {
        // current tick 0-500, event 0-500; event is half the duration of per second; 4 hits per second => 2 hits; Per hit, applicable values should be divided by (2 * 2) = 4
        baseDamageModifiersDefinition.damageDealtIsPerSecond = true;
        hitCount.numberOfHitsFixed = undefined;
        hitCount.numberOfHitsPerSecond = 4;
        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            baseDamageModifiers: {
              attackMultiplier: 0.3,
              attackFlat: 63,
              hpMultiplier: 0.075,
              sumOfResistancesMultiplier: 0.075,
              critRateFlatMultiplier: 0.075,
              resourceAmountMultiplier: 1,
            },
          })
        );
      });

      it('should calculate the base damage modifiers correctly, when there is an applicable resource for the resource amount multiplier', () => {
        const currentResource: CurrentResource = {
          id: 'resource-id',
          amount: 100,
        };
        currentResources = mock<CurrentResources>({
          all: [currentResource],
        });
        currentResources.find
          .calledWith('resource-id')
          .mockReturnValue(currentResource);

        resetSut();

        sut.process();
        expect(eventManager.publishAttackHit).toHaveBeenCalledWith(
          expect.objectContaining({
            baseDamageModifiers: expect.objectContaining({
              resourceAmountMultiplier: 300,
            }),
          })
        );
      });
    });
  });
});
