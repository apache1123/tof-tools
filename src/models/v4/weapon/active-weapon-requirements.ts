import type { WeaponName } from '../../../definitions/weapons/weapon-definitions';
import type { Weapon } from '../../weapon';
import type { Requirements } from '../requirements/requirements';

export class ActiveWeaponRequirements implements Requirements {
  public constructor(
    private readonly isWeapon?: WeaponName,
    private readonly isNotWeapon?: WeaponName
  ) {}

  public haveBeenMet(activeWeapon: Weapon | undefined): boolean {
    if (this.isWeapon && this.isWeapon !== activeWeapon?.id) return false;

    if (this.isNotWeapon && this.isNotWeapon === activeWeapon?.id) return false;

    return true;
  }
}
