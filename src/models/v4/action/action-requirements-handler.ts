import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { ActionRequirements } from './action-requirements';

export class ActionRequirementsHandler extends EventHandler {
  public constructor(
    private readonly requirements: ActionRequirements,
    private readonly team: Team,
    private readonly weaponTracker: WeaponTracker,
    private readonly buffRegistry: BuffRegistry,
    private readonly resourceRegistry: ResourceRegistry
  ) {
    super();
  }

  public handle(data: EventData) {
    if (!this.hasActionMetRequirements(data)) return;
    return super.handle(data);
  }

  private hasActionMetRequirements(eventData: EventData): boolean {
    const { time } = eventData;
    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;

    // Check requirements from most specific to least specific for efficiency

    if (
      this.requirements.hasResource &&
      !this.resourceRegistry.hasResource(
        this.requirements.hasResource.resourceId,
        time,
        this.requirements.hasResource.minAmount
      )
    )
      return false;

    if (
      this.requirements.activeBuff &&
      !this.buffRegistry.isBuffActiveAt(this.requirements.activeBuff, time)
    )
      return false;

    if (
      this.requirements?.activeWeapon &&
      this.requirements.activeWeapon !== this.weaponTracker.activeWeapon?.id
    )
      return false;

    if (
      this.requirements?.notActiveWeapon &&
      this.requirements.notActiveWeapon === this.weaponTracker.activeWeapon?.id
    )
      return false;

    if (
      this.requirements.anyWeaponInTeam &&
      this.requirements.anyWeaponInTeam.every(
        (weaponName) => !weaponNames.includes(weaponName)
      )
    )
      return false;

    if (
      this.requirements.weaponResonance &&
      weaponResonance !== this.requirements.weaponResonance
    )
      return false;

    if (
      this.requirements?.elementalTypeWeaponsInTeam &&
      this.requirements.elementalTypeWeaponsInTeam.every((requirement) => {
        const numOfWeaponsOfElementalType = weaponElementalTypes.filter(
          (x) => x === requirement.elementalType
        ).length;

        return numOfWeaponsOfElementalType !== requirement.numOfWeapons;
      })
    )
      return false;

    const notElementalTypeWeaponRequirement =
      this.requirements.notElementalTypeWeaponsInTeam;
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

    if (this.requirements.numOfDifferentElementalTypesInTeam) {
      const numOfDifferentElementalTypes = Object.keys(
        groupBy(weaponElementalTypes)
      ).length;

      if (
        numOfDifferentElementalTypes !==
        this.requirements.numOfDifferentElementalTypesInTeam
      )
        return false;
    }

    return true;
  }
}
