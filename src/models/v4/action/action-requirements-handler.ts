import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { ActionRequirements } from './action-requirements';

export class ActionRequirementsHandler extends EventHandler {
  public constructor(
    private readonly actionRequirements: ActionRequirements,
    private readonly team: Team,
    private readonly weaponTracker: WeaponTracker,
    private readonly chargeTimeline: ChargeTimeline,
    private readonly buffRegistry: BuffRegistry
  ) {
    super();
  }

  public handle(data: EventData): boolean {
    if (!this.hasActionMetRequirements(data)) return false;

    return super.handle(data);
  }

  private hasActionMetRequirements(eventData: EventData): boolean {
    const { requirements } = this.actionRequirements;
    if (!requirements) return true;

    const { time } = eventData;
    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;

    // Check requirements from most specific to least specific for efficiency

    if (
      requirements.activeBuff &&
      !this.buffRegistry.isBuffActiveAt(requirements.activeBuff, time)
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

    if (requirements?.hasFullCharge && !this.chargeTimeline.hasFullCharge)
      return false;

    return true;
  }
}
