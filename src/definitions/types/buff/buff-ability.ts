import type { AbilityId } from '../../../models/v4/ability/ability-id';
import type { MiscellaneousBuff } from '../../../models/v4/buff/miscellaneous-buff';
import type { Ability } from '../ability/ability';
import type { AttackBuff } from './attack-buff';
import type { BaseAttackBuff } from './base-attack-buff';
import type { CritDamageBuff } from './crit-damage-buff';
import type { CritRateBuff } from './crit-rate-buff';
import type { ElementalDamageBuff } from './elemental-damage-buff';
import type { FinalDamageBuff } from './final-damage-buff';

export type BuffId = AbilityId;

export interface BuffAbility extends Ability {
  id: BuffId;
  maxStacks: number;

  baseAttackBuffs?: BaseAttackBuff[];
  attackBuffs?: AttackBuff[];
  elementalDamageBuffs?: ElementalDamageBuff[];
  finalDamageBuffs?: FinalDamageBuff[];
  critRateBuffs?: CritRateBuff[];
  critDamageBuffs?: CritDamageBuff[];
  miscBuff?: MiscellaneousBuff;
}
