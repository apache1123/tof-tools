import type { CommonWeaponPassiveAttackBuffId } from '../../constants/common-weapon-attack-buffs';
import type { AttackBuffDefinition } from './attack-buff-definition';

export interface CommonWeaponPassiveAttackBuffDefinition
  extends AttackBuffDefinition {
  id: CommonWeaponPassiveAttackBuffId;
}
