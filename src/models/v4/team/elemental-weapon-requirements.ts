import groupBy from "lodash.groupby";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { Team } from "../../team";
import type { Requirements } from "../requirements/requirements";

export class ElementalWeaponRequirements implements Requirements {
  public constructor(
    /** If multiple are defined, it will be an "OR" check between them */
    private readonly numOfElementalWeapons?: {
      element: WeaponElementalType;
      numOfWeapons: number;
    }[],
    /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
    private readonly numOfNotElementalWeapons?: {
      notElement: WeaponElementalType;
      numOfWeapons: number;
    },
    private readonly numOfDifferentElementalTypes?: number,
  ) {}

  public haveBeenMet(team: Team): boolean {
    const { weapons, weaponElementalTypes } = team;

    if (
      this.numOfElementalWeapons &&
      this.numOfElementalWeapons.every((requirement) => {
        const numOfWeaponsOfElementalType = weaponElementalTypes.filter(
          (x) => x === requirement.element,
        ).length;

        return numOfWeaponsOfElementalType !== requirement.numOfWeapons;
      })
    )
      return false;

    const notElementalWeaponRequirement = this.numOfNotElementalWeapons;
    if (notElementalWeaponRequirement) {
      const numOfNotElementalTypeWeapons = weapons.filter(
        (weapon) =>
          !weapon.definition.resonanceElements.includes(
            notElementalWeaponRequirement.notElement,
          ),
      ).length;

      if (
        numOfNotElementalTypeWeapons !==
        notElementalWeaponRequirement.numOfWeapons
      )
        return false;
    }

    if (this.numOfDifferentElementalTypes) {
      const numOfDifferentElementalTypes = Object.keys(
        groupBy(weaponElementalTypes),
      ).length;

      if (numOfDifferentElementalTypes !== this.numOfDifferentElementalTypes)
        return false;
    }

    return true;
  }
}
