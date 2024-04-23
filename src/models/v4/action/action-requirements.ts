import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { WeaponResonance } from '../../../constants/weapon-resonance';
import type { ResourceId } from '../resource/resource-definition';

/** Requirements are treated as a "AND" check i.e. the action can be triggered when all defined requirements pass check */
export interface ActionRequirements {
  // Order requirements from most specific to least specific. Check in this order for efficiency

  hasResource?: {
    resourceId: ResourceId;
    minAmount: number;
  };
  activeBuff?: string;
  activeWeapon?: WeaponName;
  /** Can only be triggered when [weapon] is not active weapon e.g. the [weapon]'s discharge */
  notActiveWeapon?: WeaponName;
  anyWeaponInTeam?: WeaponName[];
  weaponResonance?: WeaponResonance;
  /** If multiple are defined, it will be an "OR" check between them */
  elementalTypeWeaponsInTeam?: {
    elementalType: WeaponElementalType;
    numOfWeapons: number;
  }[];
  /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
  notElementalTypeWeaponsInTeam?: {
    notElementalType: WeaponElementalType;
    numOfWeapons: number;
  };
  /** The specified number of different elemental weapon types must be in team */
  numOfDifferentElementalTypesInTeam?: number;
}
