import groupBy from "lodash.groupby";

import type { ElementalType } from "../../definitions/elemental-type";
import type { Requirements } from "../requirements/requirements";
import type { Team } from "./team";

export class ElementalWeaponRequirements implements Requirements {
  public constructor(
    /** If multiple are defined, it will be an "OR" check between them */
    private readonly numOfElementalWeapons?: {
      element: ElementalType;
      numOfWeapons: number;
    }[],
    /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
    private readonly numOfNotElementalWeapons?: {
      notElement: ElementalType;
      numOfWeapons: number;
    },
    private readonly numOfDifferentElementalTypes?: number,
  ) {}

  public haveBeenMet(team: Team): boolean {
    const weapons = team.getEquippedWeapons();
    const weaponElementalTypes = team.getWeaponElementalTypes();

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
          !weapon.resonanceElements.includes(
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
