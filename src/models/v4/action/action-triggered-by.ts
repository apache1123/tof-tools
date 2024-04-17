import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';

export interface ActionTriggeredBy {
  /** Triggered manually by player as part of gameplay */
  playerInput?: boolean;

  combatStart?: boolean;
  // TODO: applyToEndSegmentOfCombat

  hitOfAnyWeapon?: boolean;
  skillOfAnyWeapon?: boolean;
  dischargeOfAnyWeapon?: boolean;
  skillOfWeaponType?: WeaponType;
  dischargeOfWeaponType?: WeaponType;
  skillOfElementalType?: WeaponElementalType;
  dischargeOfElementalType?: WeaponElementalType;
  fullChargeOfWeapons?: WeaponName[];
  weaponAttacks?: string[];

  /** e.g. If [weapon] is in off-hand slot, ... */
  notActiveWeapon?: WeaponName;
  activeWeapon?: WeaponName;
}
