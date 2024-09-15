import type { BuffId } from '../../../definitions/types/buff/buff-ability';
import type { AttackBuff } from './attack-buff';
import type { BaseAttackBuff } from './base-attack-buff';
import type { CritDamageBuff } from './crit-damage-buff';
import type { CritRateBuff } from './crit-rate-buff';
import type { ElementalDamageBuff } from './elemental-damage-buff';
import type { FinalDamageBuff } from './final-damage-buff';

export interface ActiveBuff {
  buffId: BuffId;
  baseAttackBuffs: BaseAttackBuff[];
  attackBuffs: AttackBuff[];
  elementalDamageBuffs: ElementalDamageBuff[];
  finalDamageBuffs: FinalDamageBuff[];
  critRateBuffs: CritRateBuff[];
  critDamageBuffs: CritDamageBuff[];
}
