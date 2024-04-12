import type { WeaponElementalType } from '../../../constants/elemental-type';

export interface AttackBuff {
  value: number;
  elementalTypes: WeaponElementalType[];
}
