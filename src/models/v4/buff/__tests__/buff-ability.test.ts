import { mock } from 'jest-mock-extended';

import type { AbilityId } from '../../ability/ability-id';
import type { AbilityRequirements } from '../../ability/ability-requirements';
import type { AbilityUpdatesResource } from '../../ability/ability-updates-resource';
import { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import type { AttackBuff } from '../attack-buff/attack-buff';
import type { BaseAttackBuff } from '../base-attack-buff/base-attack-buff';
import { BuffAbility } from '../buff-ability';
import { BuffTimeline } from '../buff-timeline';
import type { CritDamageBuff } from '../crit-damage-buff/crit-damage-buff';
import type { CritRateBuff } from '../crit-rate-buff/crit-rate-buff';
import type { ElementalDamageBuff } from '../elemental-damage-buff/elemental-damage-buff';
import type { FinalDamageBuff } from '../final-damage-buff/final-damage-buff';

let id: AbilityId;
let displayName: string;
let cooldown: number;
let duration: number | undefined;
let canBePlayerTriggered: boolean;
let requirements: AbilityRequirements;
let updatesResources: AbilityUpdatesResource[];
let timeline: BuffTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;
let maxStacks: number;
let baseAttackBuffs: BaseAttackBuff[];
let attackBuffs: AttackBuff[];
let elementalDamageBuffs: ElementalDamageBuff[];
let finalDamageBuffs: FinalDamageBuff[];
let critRateBuffs: CritRateBuff[];
let critDamageBuffs: CritDamageBuff[];

let sut: BuffAbility;

describe('Buff ability', () => {
  beforeEach(() => {
    id = 'id';
    displayName = 'displayName';
    cooldown = 0;
    duration = 3000;
    canBePlayerTriggered = false;
    requirements = mock<AbilityRequirements>({
      haveBeenMet: () => true,
    });
    updatesResources = [];
    timeline = new BuffTimeline(100000);
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000);
    maxStacks = 2;
    baseAttackBuffs = [];
    attackBuffs = [];
    elementalDamageBuffs = [];
    finalDamageBuffs = [];
    critRateBuffs = [];
    critDamageBuffs = [];

    resetSut();
  });

  function resetSut() {
    sut = new BuffAbility(
      id,
      displayName,
      cooldown,
      duration,
      canBePlayerTriggered,
      requirements,
      updatesResources,
      timeline,
      eventManager,
      currentTick,
      maxStacks,
      baseAttackBuffs,
      attackBuffs,
      elementalDamageBuffs,
      finalDamageBuffs,
      critRateBuffs,
      critDamageBuffs
    );
  }

  it('cannot trigger when it is already at max stacks', () => {
    expect(sut.canTrigger()).toBe(true);
    sut.trigger();
    currentTick.advance(); // -> 1000-2000, one stack
    expect(sut.canTrigger()).toBe(true);
    sut.trigger();
    currentTick.advance(); // -> 2000-3000, two stacks
    expect(sut.canTrigger()).toBe(false);
    currentTick.advance(); // -> 3000-4000, one stack (one buff event has ended)
    expect(sut.canTrigger()).toBe(true);
  });
});
