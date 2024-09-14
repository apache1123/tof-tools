import type { ResourceId } from '../../../models/v4/resource/resource-definition';
import type { WeaponElementalType } from '../../elemental-type';
import type { WeaponName } from '../../weapons/weapon-definitions';
import type { WeaponResonance } from '../../weapons/weapon-resonance';

/** Requirements are treated as a "AND" check i.e. the ability can be triggered when all defined requirements pass check */
export interface AbilityRequirements {
  activeBuff?: string;

  activeWeapon?: {
    is?: WeaponName;
    /** e.g. can only be triggered when [weapon] is not active weapon */
    isNot?: WeaponName;
  };

  /** Requirements related to the team composition */
  teamRequirements?: {
    /** Any of these weapons in the team */
    anyWeapon?: WeaponName[];

    weaponResonance?: {
      is?: WeaponResonance;
      isNot?: WeaponResonance;
    };

    elementalWeapons?: {
      /** If multiple are defined, it will be an "OR" check between them */
      numOfElementalWeapons?: {
        element: WeaponElementalType;
        numOfWeapons: number;
      }[];
      /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
      numOfNotElementalWeapons?: {
        notElement: WeaponElementalType;
        numOfWeapons: number;
      };
      /** The specified number of different elemental weapon types must be in team */
      numOfDifferentElementalTypes?: number;
    };
  };

  hasResource?: {
    id: ResourceId;
    minAmount: number;
  };
}
