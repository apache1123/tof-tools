import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { ActionRequirements } from './action-requirements';

export class ActionRequirementsChecker {
  public constructor(
    private readonly team: Team,
    private readonly weaponTracker: WeaponTracker,
    private readonly buffRegistry: BuffRegistry,
    private readonly resourceRegistry: ResourceRegistry
  ) {}

  public hasRequirementsBeenMetAt(
    requirements: ActionRequirements,
    time: number
  ) {
    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;

    // Check requirements from most specific to least specific for efficiency

    if (
      requirements.hasResource &&
      !this.resourceRegistry.hasResource(
        requirements.hasResource.resourceId,
        time,
        requirements.hasResource.minAmount
      )
    )
      return false;

    if (
      requirements.activeBuff &&
      !this.buffRegistry.isBuffActiveAt(requirements.activeBuff, time)
    )
      return false;

    if (
      requirements?.activeWeapon &&
      requirements.activeWeapon !== this.weaponTracker.activeWeapon?.id
    )
      return false;

    if (
      requirements?.notActiveWeapon &&
      requirements.notActiveWeapon === this.weaponTracker.activeWeapon?.id
    )
      return false;

    if (
      requirements.anyWeaponInTeam &&
      requirements.anyWeaponInTeam.every(
        (weaponName) => !weaponNames.includes(weaponName)
      )
    )
      return false;

    if (
      requirements.weaponResonance &&
      weaponResonance !== requirements.weaponResonance
    )
      return false;

    if (
      requirements?.elementalTypeWeaponsInTeam &&
      requirements.elementalTypeWeaponsInTeam.every((requirement) => {
        const numOfWeaponsOfElementalType = weaponElementalTypes.filter(
          (x) => x === requirement.elementalType
        ).length;

        return numOfWeaponsOfElementalType !== requirement.numOfWeapons;
      })
    )
      return false;

    const notElementalTypeWeaponRequirement =
      requirements.notElementalTypeWeaponsInTeam;
    if (notElementalTypeWeaponRequirement) {
      const numOfNotElementalTypeWeapons = weapons.filter(
        (weapon) =>
          !weapon.definition.resonanceElements.includes(
            notElementalTypeWeaponRequirement.notElementalType
          )
      ).length;

      if (
        numOfNotElementalTypeWeapons !==
        notElementalTypeWeaponRequirement.numOfWeapons
      )
        return false;
    }

    if (requirements.numOfDifferentElementalTypesInTeam) {
      const numOfDifferentElementalTypes = Object.keys(
        groupBy(weaponElementalTypes)
      ).length;

      if (
        numOfDifferentElementalTypes !==
        requirements.numOfDifferentElementalTypesInTeam
      )
        return false;
    }

    return true;
  }
}
