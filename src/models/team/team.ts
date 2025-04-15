import type { ElementalType } from "../../definitions/elemental-type";
import { numWeaponsInTeam } from "../../definitions/team";
import type { MatrixBuffDefinition } from "../../definitions/types/matrix/matrix-buff-definition";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../definitions/weapons/weapon-resonance";
import { filterOutUndefined } from "../../utils/array-utils";
import type { Weapon } from "../weapon/weapon";

export class Team {
  public constructor() {
    this.weapons = [];
  }

  public static maxNumOfWeapons = numWeaponsInTeam;

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

  /** Returns all equipped weapon ids */
  public getWeaponIds(): WeaponDefinitionId[] {
    return this.getEquippedWeapons().map((weapon) => weapon.id);
  }

  /** Convenience method to return all equipped weapon elemental types, as is. Useful for counting the number of weapons for a given elemental type */
  public getWeaponElementalTypes(): ElementalType[] {
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

  public getWeaponBuffDefinitions() {
    return this.getEquippedWeapons().flatMap(
      (weapon) => weapon.buffDefinitions,
    );
  }

  public getMatrixBuffDefinitions() {
    // TODO: Some matrix buffs can stack?
    // Assuming buff definition objects are reused and can be "uniqued" by object instance
    const results = new Set<MatrixBuffDefinition>();
    for (const weapon of this.getEquippedWeapons()) {
      for (const buffDefinition of weapon.matrixSlots.buffDefinitions) {
        results.add(buffDefinition);
      }
    }

    return [...results.values()];
  }

  private clearWeapons() {
    this.weapons.length = 0;
  }
}
