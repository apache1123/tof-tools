import type {
  AbilityDefinition,
  AbilityId,
} from '../ability/ability-definition';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityRequirements } from '../ability/ability-requirements';
import type { AbilityTriggeredBy } from '../ability/ability-triggered-by';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { AttackBuff } from './attack-buff';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type BuffId = AbilityId;

export interface BuffDefinition extends AbilityDefinition {
  maxStacks: number;

  attackBuffs?: AttackBuff[];
  damageBuffs?: DamageBuff[];
  miscBuff?: MiscellaneousBuff;

  triggeredBy: AbilityTriggeredBy;
  endedBy: AbilityEndedBy;

  requirements: AbilityRequirements;

  updatesResources?: AbilityUpdatesResource[];
}
