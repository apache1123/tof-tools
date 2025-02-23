import type { ResourceId } from "../../../models/resource/resource-definition";
import type { WeaponElementalType } from "../../elemental-type";
import type { WeaponDefinitionId } from "../../weapons/weapon-definitions";
import type { WeaponResonance } from "../../weapons/weapon-resonance";

/** Requirements are treated as a "AND" check i.e. the ability can be triggered when all defined requirements pass check */
export interface AbilityRequirementsDefinition {
  activeBuff?: string;

  activeWeapon?: {
    is?: WeaponDefinitionId;
    /** e.g. can only be triggered when [weapon] is not active weapon */
    isNot?: WeaponDefinitionId;
  };

  /** Requirements related to the team composition */
  teamRequirements?: {
    /** Any of these weapons in the team */
    anyWeapon?: WeaponDefinitionId[];

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
