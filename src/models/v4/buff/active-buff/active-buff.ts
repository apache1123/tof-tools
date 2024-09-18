import type { BuffId } from '../../../../definitions/types/buff/buff-ability';
import type { AttackBuff } from '../attack-buff/attack-buff';
import type { BaseAttackBuff } from '../base-attack-buff/base-attack-buff';
import type { CritDamageBuff } from '../crit-damage-buff/crit-damage-buff';
import type { CritRateBuff } from '../crit-rate-buff/crit-rate-buff';
import type { ElementalDamageBuff } from '../elemental-damage-buff/elemental-damage-buff';
import type { FinalDamageBuff } from '../final-damage-buff/final-damage-buff';

/** A currently active buff at the current tick, stemming from a buff ability */
export interface ActiveBuff {
  readonly buffId: BuffId;
  readonly baseAttackBuffs: BaseAttackBuff[];
  readonly attackBuffs: AttackBuff[];
  readonly elementalDamageBuffs: ElementalDamageBuff[];
  readonly finalDamageBuffs: FinalDamageBuff[];
  readonly critRateBuffs: CritRateBuff[];
  readonly critDamageBuffs: CritDamageBuff[];
}
