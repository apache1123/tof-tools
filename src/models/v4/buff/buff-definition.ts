import type {
  AbilityDefinition,
  AbilityId,
} from '../ability/ability-definition';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityTriggeredBy } from '../ability/ability-triggered-by';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { AttackBuff } from './attack-buff';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type BuffId = AbilityId;

export interface BuffDefinition extends AbilityDefinition {
  maxStacks: number;

  attackBuffs?: AttackBuff[];
  damageBuffs?: DamageBuff[];
  critDamageBuffs?: CritDamageBuff[];
  miscBuff?: MiscellaneousBuff;

  triggeredBy: AbilityTriggeredBy;
  endedBy: AbilityEndedBy;

  updatesResources?: AbilityUpdatesResource[];
}
