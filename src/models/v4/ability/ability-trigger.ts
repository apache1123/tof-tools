import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { Ability } from './ability';
import type { AbilityRequirements } from './ability-requirements';

/** An ability trigger is a defined way of triggering an ability, e.g. through player input or triggered by the end of anther ability etc.. Often comes with a condition that must be met before an ability can be triggered */
export class AbilityTrigger {
  public constructor(
    public readonly eventId: string,
    public readonly isPlayerInputTrigger: boolean,
    private readonly requirements: AbilityRequirements,
    private readonly ability: Ability,
    private readonly team: Team,
    private readonly tickTracker: TickTracker,
    private readonly weaponTracker: WeaponTracker,
    private readonly buffRegistry: BuffRegistry,
    private readonly resourceRegistry: ResourceRegistry
  ) {}

  public get abilityId() {
    return this.ability.id;
  }

  public canTrigger() {
    return this.ability.canTrigger() && this.hasRequirementsBeenMet();
  }

  public trigger() {
    if (!this.canTrigger()) return;
    return this.ability.trigger();
  }

  private hasRequirementsBeenMet() {
    const { requirements } = this;
    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;
    const time = this.tickTracker.currentTickStart;

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
      !this.buffRegistry.isActive(requirements.activeBuff)
    )
      return false;

    if (
      requirements.activeWeapon &&
      requirements.activeWeapon !== this.weaponTracker.activeWeapon?.id
    )
      return false;

    if (
      requirements.notActiveWeapon &&
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
      requirements.notWeaponResonance &&
      weaponResonance === requirements.notWeaponResonance
    )
      return false;

    if (
      requirements.elementalTypeWeaponsInTeam &&
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
