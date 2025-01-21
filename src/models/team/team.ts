import { nanoid } from "nanoid";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import { numWeaponsInTeam } from "../../definitions/team";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../definitions/weapons/weapon-resonance";
import { filterOutUndefined } from "../../utils/array-utils";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import type { Weapon } from "../weapon/weapon";

export type TeamId = Id;

export class Team {
  public constructor(
    characterId: CharacterId,
    id?: TeamId,
    weapons?: (Weapon | undefined)[],
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.weapons = weapons ?? [];
  }

  public static maxNumOfWeapons = numWeaponsInTeam;

  public readonly id: TeamId;
  public readonly characterId: CharacterId;
  private readonly weapons: (Weapon | undefined)[];

  /** Returns the list of weapons, including undefined values if a weapon is not equipped. */
  public getWeapons(): ReadonlyArray<Weapon | undefined> {
    return this.weapons;
  }

  /** Returns the list of equipped weapons only. The index of the weapon in the returned array may not be the same as the index of the weapon in the team list. */
  public getEquippedWeapons() {
    return filterOutUndefined(this.weapons);
  }

  public setWeapon(index: number, weapon: Weapon | undefined) {
    if (index < 0 || index >= Team.maxNumOfWeapons) {
      throw new Error(`Invalid index: ${index}`);
    }

    this.weapons[index] = weapon;
  }

  /** Returns all equipped weapon names */
  public getWeaponNames(): WeaponName[] {
    return this.getEquippedWeapons().map((weapon) => weapon.definitionId);
  }

  /** Convenience method to return all equipped weapon elemental types, as is. Useful for counting the number of weapons for a given elemental type */
  public getWeaponElementalTypes(): WeaponElementalType[] {
    return this.getEquippedWeapons().flatMap(
      (weapon) => weapon.resonanceElements,
    );
  }

  public getWeaponResonance(): WeaponResonance {
    const weaponTypes = this.getEquippedWeapons().flatMap((weapon) => {
      return weapon.type;
    });

    if (weaponTypes.filter((type) => type === "DPS").length > 1)
      return "Attack";
    if (weaponTypes.filter((type) => type === "Defense").length > 1)
      return "Fortitude";
    if (weaponTypes.filter((type) => type === "Support").length > 1)
      return "Benediction";
    if (
      weaponTypes.filter((type) => type === "DPS").length &&
      weaponTypes.filter((type) => type === "Defense").length &&
      weaponTypes.filter((type) => type === "Support").length
    )
      return "Balance";

    return "None";
  }
}
