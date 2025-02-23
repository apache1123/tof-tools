import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import type { Requirements } from "../requirements/requirements";
import type { Weapon } from "./weapon";

export class ActiveWeaponRequirements implements Requirements {
  public constructor(
    private readonly isWeapon?: WeaponDefinitionId,
    private readonly isNotWeapon?: WeaponDefinitionId,
  ) {}

  public haveBeenMet(activeWeapon: Weapon | undefined): boolean {
    if (this.isWeapon && this.isWeapon !== activeWeapon?.id) return false;

    if (this.isNotWeapon && this.isNotWeapon === activeWeapon?.id) return false;

    return true;
  }
}
