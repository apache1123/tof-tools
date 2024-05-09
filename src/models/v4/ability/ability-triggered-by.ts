import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapons/weapon-definitions';
import type { WeaponType } from '../../../constants/weapons/weapon-type';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

export interface AbilityTriggeredBy {
  /** Triggered manually by player as part of gameplay */
  playerInput?: boolean;

  combatStart?: boolean;
  // TODO: applyToEndSegmentOfCombat

  /** e.g. If [weapon] is in off-hand slot, ... */
  notActiveWeapon?: WeaponName;
  activeWeapon?: WeaponName;

  fullChargeOfWeapons?: WeaponName[];

  startOfAnyAttack?: boolean;
  endOfAnyAttack?: boolean;
  
  /** Triggered upon start of the defined attacks */
  startOfAttacks?: string[];
  /** Triggered upon end of the defined attacks */
  endOfAttacks?: string[];
  
  /** Triggered upon start of any skill attack */
  startOfAnySkillAttack?: boolean;
  /** Triggered upon end of any skill attack */
  endOfAnySkillAttack?: boolean;
  
  /** Trigger upon start of any discharge attack */
  startOfAnyDischargeAttack?: boolean;
  /** Trigger upon end of any discharge attack */
  endOfAnyDischargeAttack?: boolean;
  
  /** Trigger upon start of any skill of a weapon type */
  startOfSkillOfWeaponType?: WeaponType;
  /** Trigger upon end of any skill of a weapon type */
  endOfSkillOfWeaponType?: WeaponType;

  /** Trigger upon start of any discharge of a weapon type */
  startOfDischargeOfWeaponType?: WeaponType;
  /** Trigger upon end of any discharge of a weapon type */
  endOfDischargeOfWeaponType?: WeaponType;
  
  /** Trigger upon start of any skill of an elemental type */
  startOfSkillOfElementalType?: WeaponElementalType;
  /** Trigger upon end of any skill of an elemental type */
  endOfSkillOfElementalType?: WeaponElementalType;
  
  /** Trigger upon start of any discharge of an elemental type */
  startOfDischargeOfElementalType?: WeaponElementalType;
  /** Trigger upon end of any discharge of an elemental type */
  endOfDischargeOfElementalType?: WeaponElementalType;

  hitOfAnyAttack?: boolean;
  hitOfWeapon?: WeaponName;

  /** Trigger upon start of the defined buff */
  startOfBuff?: BuffId;
  /** Trigger upon end of the defined buff */
  endOfBuff?: BuffId;

  resourceUpdate?: ResourceId;
}
