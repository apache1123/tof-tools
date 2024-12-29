import { nanoid } from "nanoid";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import { numWeaponsInTeam } from "../../definitions/team";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../definitions/weapons/weapon-resonance";
import { filterOutUndefined } from "../../utils/array-utils";
import type { CharacterId } from "../character/character";
import type { Id } from "../identifiable";
import type { Weapon } from "../weapon/weapon";
import { WeaponSlot } from "../weapon/weapon-slot";

export type TeamId = Id;

export class Team {
  public constructor(
    characterId: CharacterId,
    id?: TeamId,
    weaponSlots?: WeaponSlot[],
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.weaponSlots =
      weaponSlots ?? [...Array(numWeaponsInTeam)].map(() => new WeaponSlot());
  }

  public readonly id: TeamId;
  public readonly characterId: CharacterId;
  public readonly weaponSlots: WeaponSlot[];

  /** Returns all equipped weapons */
  public get weapons(): Weapon[] {
    return filterOutUndefined(this.weaponSlots.map((slot) => slot.weapon));
  }

  /** Returns all equipped weapon names */
  public get weaponNames(): WeaponName[] {
    return this.weapons.map((weapon) => weapon.definitionId);
  }

  /** Convenience method to return all equipped weapon elemental types, as is. Useful for counting the number of weapons for a given elemental type */
  public get weaponElementalTypes(): WeaponElementalType[] {
    return this.weapons.flatMap((weapon) => weapon.resonanceElements);
  }

  public get weaponResonance(): WeaponResonance {
    const weaponTypes = this.weapons.flatMap((weapon) => {
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
