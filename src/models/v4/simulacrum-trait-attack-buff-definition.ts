import type { WeaponType } from '../../constants/weapon-definitions';
import type { AttackBuffDefinition } from './attack-buff-definition';

export type SimulacrumTraitPassiveAttackBuffDefinition = AttackBuffDefinition;

export interface SimulacrumTraitConditionalAttackBuffDefinition
  extends AttackBuffDefinition {
  triggeredBySkillOfWeaponType?: {
    weaponType: WeaponType;
  };
  triggeredByDischargeOfWeaponType?: {
    weaponType: WeaponType;
  };
  triggeredByWeaponAttack?: string;
  triggeredByAnyWeaponSkill?: boolean;
  triggeredByAnyWeaponDischarge?: boolean;
}
