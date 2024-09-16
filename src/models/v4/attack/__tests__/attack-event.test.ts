import type { AttackType } from '../../../../definitions/attack-type';
import type { WeaponElementalType } from '../../../../definitions/elemental-type';
import type { Weapon as WeaponDefinition } from '../../../../definitions/types/weapon/weapon';
import { Weapon } from '../../../weapon';
import {
  cooldownTest,
  createAbilityId,
  createCooldown,
  createCurrentCombatState,
  createCurrentTick,
  createEventManager,
  createTimeInterval,
  createUpdatesResources,
  publishAbilityEndTest,
  requestResourceDepletionTest,
  requestResourceUpdateFlatAmountTest,
  requestResourceUpdatePerSecondAmountTest,
} from '../../ability/__tests__/ability-event-tests';
import type { AbilityId } from '../../ability/ability-id';
import type { AbilityUpdatesResource } from '../../ability/ability-updates-resource';
import type { CurrentCombatState } from '../../combat-state/current-combat-state';
import type { BaseDamageModifiersDefinition } from '../../damage-modifiers/base-damage-modifiers-definition';
import type { FinalDamageModifiersDefinition } from '../../damage-modifiers/final-damage-modifiers-definition';
import type { EventManager } from '../../event/event-manager';
import type { CurrentTick } from '../../tick/current-tick';
import type { TimeInterval } from '../../time-interval/time-interval';
import { AttackEvent } from '../attack-event';
import type { AttackHitCount } from '../attack-hit-count';

// Ability event dependencies / properties
let timeInterval: TimeInterval;
let abilityId: AbilityId;
let cooldown: number;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentCombatState: CurrentCombatState;

// Attack event dependencies / properties
const elementalType: WeaponElementalType = 'Volt';
let baseDamageModifiersDefinition: BaseDamageModifiersDefinition;
let finalDamageModifiersDefinition: FinalDamageModifiersDefinition;
const type: AttackType = 'normal';
let hitCount: AttackHitCount;
let weapon: Weapon;

let sut: AttackEvent;

describe('Attack event', () => {
  beforeEach(() => {
    timeInterval = createTimeInterval();
    abilityId = createAbilityId();
    cooldown = createCooldown();
    updatesResources = createUpdatesResources();
    eventManager = createEventManager();
    currentTick = createCurrentTick();
    currentCombatState = createCurrentCombatState();

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

  describe('Ability event tests', () => {
    it('returns correctly if it is on cooldown', () => {
      cooldownTest(sut);
    });

    it('should publish ability end if the end time of this event is in the current tick', () => {
      publishAbilityEndTest(sut, currentTick, eventManager);
    });

    describe('request resource updates', () => {
      it('should request resource update with the correct resource amount, adjusted for the duration of the tick, when the amount to update is defined as a flat amount for the duration of the attack event', () => {
        requestResourceUpdateFlatAmountTest(
          sut,
          updatesResources,
          eventManager
        );
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
});
