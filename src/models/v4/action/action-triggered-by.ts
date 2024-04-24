import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

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

  buffStart?: BuffId;

  /** e.g. If [weapon] is in off-hand slot, ... */
  notActiveWeapon?: WeaponName;
  activeWeapon?: WeaponName;

  resourceUpdate?: ResourceId;
}
