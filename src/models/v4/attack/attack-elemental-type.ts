import type { WeaponElementalType } from '../../../constants/elemental-type';

export interface AttackElementalType {
  defaultElementalType: WeaponElementalType;
  followLastWeaponElementalType?: boolean;
  followCurrentWeaponElementalType?: boolean;
}
