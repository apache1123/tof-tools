import type { AbilityId } from '../../../models/v4/ability/ability-id';
import type { ResourceId } from '../../../models/v4/resource/resource-definition';
import type { WeaponName } from '../../weapons/weapon-definitions';

export interface AbilityTriggeredBy {
  combatStart?: boolean;
  // TODO: applyToEndSegmentOfCombat

  activeWeaponChange?: boolean;

  /** Trigger upon start of the defined abilities */
  abilityStart?: AbilityId[];
  /** Trigger upon end of the defined abilities */
  abilityEnd?: AbilityId[];

  // fullChargeOfWeapons?: WeaponName[];

  // startOfAnyAttack?: boolean;
  // endOfAnyAttack?: boolean;

  // /** Triggered upon start of the defined attacks */
  // startOfAttacks?: string[];
  // /** Triggered upon end of the defined attacks */
  // endOfAttacks?: string[];

  // /** Triggered upon start of any skill attack */
  // startOfAnySkillAttack?: boolean;
  // /** Triggered upon end of any skill attack */
  // endOfAnySkillAttack?: boolean;

  // /** Trigger upon start of any discharge attack */
  // startOfAnyDischargeAttack?: boolean;
  // /** Trigger upon end of any discharge attack */
  // endOfAnyDischargeAttack?: boolean;

  // /** Trigger upon start of any skill of a weapon type */
  // startOfSkillOfWeaponType?: WeaponType;
  // /** Trigger upon end of any skill of a weapon type */
  // endOfSkillOfWeaponType?: WeaponType;

  // /** Trigger upon start of any discharge of a weapon type */
  // startOfDischargeOfWeaponType?: WeaponType;
  // /** Trigger upon end of any discharge of a weapon type */
  // endOfDischargeOfWeaponType?: WeaponType;

  // /** Trigger upon start of any skill of an elemental type */
  // startOfSkillOfElementalType?: WeaponElementalType;
  // /** Trigger upon end of any skill of an elemental type */
  // endOfSkillOfElementalType?: WeaponElementalType;

  // /** Trigger upon start of any discharge of an elemental type */
  // startOfDischargeOfElementalType?: WeaponElementalType;
  // /** Trigger upon end of any discharge of an elemental type */
  // endOfDischargeOfElementalType?: WeaponElementalType;

  hitOfAnyAttack?: boolean;
  hitOfWeapon?: WeaponName;

  resourceUpdate?: ResourceId;
}
