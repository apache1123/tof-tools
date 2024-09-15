import type { WeaponElementalType } from '../../../definitions/elemental-type';
import type { WeaponName } from '../../../definitions/weapons/weapon-definitions';

export interface WeaponState {
  id: WeaponName;
  damageElement: WeaponElementalType;
}
