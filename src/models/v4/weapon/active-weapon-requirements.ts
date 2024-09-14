import type { WeaponName } from '../../../definitions/weapons/weapon-definitions';
import type { Requirements } from '../requirements/requirements';
import type { WeaponState } from './weapon-state';

export class ActiveWeaponRequirements implements Requirements {
  public constructor(
    private readonly isWeapon?: WeaponName,
    private readonly isNotWeapon?: WeaponName
  ) {}

  public haveBeenMet(activeWeapon: WeaponState | undefined): boolean {
    if (this.isWeapon && this.isWeapon !== activeWeapon?.id) return false;

    if (this.isNotWeapon && this.isNotWeapon === activeWeapon?.id) return false;

    return true;
  }
}
