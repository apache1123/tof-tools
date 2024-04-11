import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';

export interface TriggeredAction {
  /** Triggers are treated as an "OR" check i.e. the action is triggered when any defined trigger passes check */
  triggeredBy: {
    combatStart?: boolean;
    skillOfAnyWeapon?: boolean;
    dischargeOfAnyWeapon?: boolean;
    skillOfWeaponType?: WeaponType;
    dischargeOfWeaponType?: WeaponType;
    skillOfElementalType?: WeaponElementalType;
    dischargeOfElementalType?: WeaponElementalType;
    fullChargeOfWeapons?: WeaponName[];
    /** e.g. If [weapon] is in off-hand slot, ... */
    notActiveWeapon?: WeaponName;
    activeWeapon?: WeaponName;
    weaponAttacks?: string[];
  };
}
