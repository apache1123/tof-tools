import { nanoid } from "nanoid";

import { numWeaponsInTeam } from "../../definitions/team";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import type { WeaponPreset } from "../weapon/weapon-preset";

export type TeamPresetId = Id;

/** A team preset is a user-created template of a how a team is to be set up. Made up of weapon presets. The first weapon preset is the main weapon and cannot be empty unless there are no weapon presets at all. */
export class TeamPreset {
  public constructor(characterId: CharacterId, id?: TeamPresetId) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.weaponPresets = [];
    this.name = "";
  }

  public static maxNumOfWeapons = numWeaponsInTeam;
  public static mainWeaponPresetIndex = 0;

  public readonly id: TeamPresetId;
  public readonly characterId: CharacterId;
  public name: string;
  private readonly weaponPresets: (WeaponPreset | undefined)[];

  /** Has at least one weapon preset */
  public get hasWeaponPresets() {
    return this.weaponPresets.some(
      (weaponPreset) => weaponPreset !== undefined,
    );
  }

  /** The selected weapon presets. The first weapon preset is the main weapon. */
  public getWeaponPresets(): ReadonlyArray<WeaponPreset | undefined> {
    return [...Array(TeamPreset.maxNumOfWeapons)].map((_, i) =>
      this.getWeaponPreset(i),
    );
  }

  public getMainWeaponPreset() {
    return this.weaponPresets[TeamPreset.mainWeaponPresetIndex];
  }

  public getWeaponPreset(index: number) {
    return this.weaponPresets[index];
  }

  public setWeaponPreset(index: number, weaponPreset: WeaponPreset) {
    if (index < 0 || index >= TeamPreset.maxNumOfWeapons) {
      throw new Error(`Invalid index: ${index}`);
    }

    // Cannot set another weapon if the main weapon is empty.
    if (
      index !== TeamPreset.mainWeaponPresetIndex &&
      this.getMainWeaponPreset() === undefined
    ) {
      throw new Error("Cannot set another weapon if the main weapon is empty.");
    }

    this.weaponPresets[index] = weaponPreset;
  }

  public removeWeaponPreset(index: number) {
    if (index < 0 || index >= TeamPreset.maxNumOfWeapons) {
      throw new Error(`Invalid index: ${index}`);
    }

    this.weaponPresets[index] = undefined;

    // Promote the next weapon to the main weapon if the main weapon is being removed.
    if (index === TeamPreset.mainWeaponPresetIndex) {
      for (let i = 1; i < TeamPreset.maxNumOfWeapons; i++) {
        if (this.weaponPresets[i] !== undefined) {
          this.weaponPresets[TeamPreset.mainWeaponPresetIndex] =
            this.weaponPresets[i];
          this.weaponPresets[i] = undefined;
          break;
        }
      }
    }
  }

  /** Promotes the weapon at the given index to the main weapon. The previous main weapon's index is set to index */
  public setWeaponPresetToMain(index: number) {
    const newMainWeapon = this.getWeaponPreset(index);
    const oldMainWeapon = this.getMainWeaponPreset();

    if (newMainWeapon && oldMainWeapon) {
      this.weaponPresets[TeamPreset.mainWeaponPresetIndex] = newMainWeapon;
      this.weaponPresets[index] = oldMainWeapon;
    }
  }
}
