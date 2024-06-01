import type { AttackType } from '../../../constants/attack-type';
import type {
  AbilityDefinition,
  AbilityId,
} from '../ability/ability-definition';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackElementalType } from './attack-elemental-type';
import type { AttackHitCount } from './attack-hit-count';

export type AttackId = AbilityId;

export interface AttackDefinition extends AbilityDefinition {
  id: AttackId;
  type: AttackType;
  elementalType: AttackElementalType;
  damageModifiers: AttackDamageModifiers;
  hitCount: AttackHitCount;

  /** Needed for some attacks to stop them from triggering further events e.g. swift cut is a discharge that is also triggered by a discharge */
  doesNotTriggerEvents?: boolean;
}
