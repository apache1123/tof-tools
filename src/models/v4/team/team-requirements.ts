import type { WeaponName } from '../../../definitions/weapons/weapon-definitions';
import type { Team } from '../../team';
import type { Requirements } from '../requirements/requirements';
import type { ElementalWeaponRequirements } from './elemental-weapon-requirements';
import type { WeaponResonanceRequirements } from './weapon-resonance-requirements';

export class TeamRequirements implements Requirements {
  public constructor(
    private readonly anyWeapon?: WeaponName[],
    private readonly weaponResonanceRequirements?: WeaponResonanceRequirements,
    private readonly elementalWeaponRequirements?: ElementalWeaponRequirements
  ) {}

  public haveBeenMet(team: Team): boolean {
    if (
      this.anyWeapon &&
      this.anyWeapon.every(
        (weaponName) => !team.weaponNames.includes(weaponName)
      )
    )
      return false;

    if (
      this.weaponResonanceRequirements &&
      !this.weaponResonanceRequirements.haveBeenMet(team)
    )
      return false;

    if (
      this.elementalWeaponRequirements &&
      !this.elementalWeaponRequirements.haveBeenMet(team)
    )
      return false;

    return true;
  }
}
