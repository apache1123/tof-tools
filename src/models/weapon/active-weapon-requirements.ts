import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { Requirements } from "../requirements/requirements";
import type { Weapon } from "./weapon";

export class ActiveWeaponRequirements implements Requirements {
  public constructor(
    private readonly isWeapon?: WeaponName,
    private readonly isNotWeapon?: WeaponName,
  ) {}

  public haveBeenMet(activeWeapon: Weapon | undefined): boolean {
    if (this.isWeapon && this.isWeapon !== activeWeapon?.definitionId)
      return false;

    if (this.isNotWeapon && this.isNotWeapon === activeWeapon?.definitionId)
      return false;

    return true;
  }
}
