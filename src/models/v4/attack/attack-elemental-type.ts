import type { WeaponElementalType } from "../../../definitions/elemental-type";

export interface AttackElementalType {
  defaultElementalType: WeaponElementalType;
  followLastWeaponElementalType?: boolean;
  followCurrentWeaponElementalType?: boolean;
}
