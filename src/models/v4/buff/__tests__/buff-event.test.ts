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
import type { EventManager } from '../../event/event-manager';
import type { CurrentTick } from '../../tick/current-tick';
import type { TimeInterval } from '../../time-interval/time-interval';
import type { AttackBuff } from '../attack-buff';
import type { BaseAttackBuff } from '../base-attack-buff';
import { BuffEvent } from '../buff-event';
import type { CritDamageBuff } from '../crit-damage-buff';
import type { ElementalDamageBuff } from '../elemental-damage-buff';
import type { FinalDamageBuff } from '../final-damage-buff';
import type { MiscellaneousBuff } from '../miscellaneous-buff';

// Ability event dependencies / properties
let timeInterval: TimeInterval;
let abilityId: AbilityId;
let cooldown: number;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentCombatState: CurrentCombatState;

// Buff event dependencies / properties
let baseAttackBuffs: BaseAttackBuff[];
let attackBuffs: AttackBuff[];
let elementalDamageBuffs: ElementalDamageBuff[];
let finalDamageBuffs: FinalDamageBuff[];
let critRateBuffs: CritDamageBuff[];
let critDamageBuffs: CritDamageBuff[];
let miscBuff: MiscellaneousBuff | undefined;

let sut: BuffEvent;

describe('Buff event', () => {
  beforeEach(() => {
    timeInterval = createTimeInterval();
    abilityId = createAbilityId();
    cooldown = createCooldown();
    updatesResources = createUpdatesResources();
    eventManager = createEventManager();
    currentTick = createCurrentTick();
    currentCombatState = createCurrentCombatState();

    baseAttackBuffs = [];
    attackBuffs = [];
    elementalDamageBuffs = [];
    finalDamageBuffs = [];
    critRateBuffs = [];
    critDamageBuffs = [];
    miscBuff = undefined;

    sut = new BuffEvent(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick,
      currentCombatState,
      baseAttackBuffs,
      attackBuffs,
      elementalDamageBuffs,
      finalDamageBuffs,
      critRateBuffs,
      critDamageBuffs,
      miscBuff
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
