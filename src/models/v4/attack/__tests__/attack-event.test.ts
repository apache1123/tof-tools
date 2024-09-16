import { mock } from 'jest-mock-extended';

import type { AttackType } from '../../../../definitions/attack-type';
import type { WeaponElementalType } from '../../../../definitions/elemental-type';
import type { Weapon as WeaponDefinition } from '../../../../definitions/types/weapon/weapon';
import { Weapon } from '../../../weapon';
import type { AbilityId } from '../../ability/ability-id';
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
let abilityId: AbilityId;
let cooldown: number;
let updatesResources: AbilityUpdatesResource[];
let eventManager: EventManager;
let currentTick: CurrentTick;
let currentCombatState: CurrentCombatState;

let elementalType: WeaponElementalType;
let baseDamageModifiersDefinition: BaseDamageModifiersDefinition;
let finalDamageModifiersDefinition: FinalDamageModifiersDefinition;
let type: AttackType;
let hitCount: AttackHitCount;
let weapon: Weapon;

let sut: AttackEvent;

describe('Attack event', () => {
  beforeEach(() => {
    timeInterval = new TimeInterval(0, 5000);
    abilityId = 'id';
    cooldown = 1500;
    updatesResources = [];
    eventManager = mock<EventManager>();
    currentTick = new CurrentTick(0, 500);
    currentCombatState = mock<CurrentCombatState>();

    elementalType = 'Volt';
    baseDamageModifiersDefinition = {
      attackFlat: 252,
      attackMultiplier: 1.2,
      damageDealtIsPerSecond: false,
    };
    finalDamageModifiersDefinition = {};
    type = 'normal';
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
});
