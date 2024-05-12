import type {
  AbilityDefinition,
  AbilityId,
} from '../ability/ability-definition';
import type { AttackBuff } from './attack-buff';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type BuffId = AbilityId;

export interface BuffDefinition extends AbilityDefinition {
  id: BuffId;
  maxStacks: number;

  attackBuffs?: AttackBuff[];
  damageBuffs?: DamageBuff[];
  critDamageBuffs?: CritDamageBuff[];
  miscBuff?: MiscellaneousBuff;
}
