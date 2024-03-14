import type { CommonWeaponAttackBuffId } from '../../constants/common-weapon-attack-buffs';
import type { AttackBuffDefinition } from './buffs/attack-buff-definition';

export interface CommonWeaponAttackBuffDefinition extends AttackBuffDefinition {
  id: CommonWeaponAttackBuffId;
}
