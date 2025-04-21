import type { ElementalType } from "../../definitions/elemental-type";

export interface AttackElementalType {
  defaultElementalType: ElementalType;
  followLastWeaponElementalType?: boolean;
  followCurrentWeaponElementalType?: boolean;
}
