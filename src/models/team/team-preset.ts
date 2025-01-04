import { nanoid } from "nanoid";

import { numWeaponsInTeam } from "../../definitions/team";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import { WeaponPresetSlot } from "../weapon/weapon-preset-slot";

export type TeamPresetId = Id;

/** A team preset is a user-created template of a how a team is to be set up. Made up of weapon presets. */
export class TeamPreset {
  public constructor(
    characterId: CharacterId,
    id?: TeamPresetId,
    weaponPresetSlots?: WeaponPresetSlot[],
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.weaponPresetSlots =
      weaponPresetSlots ??
      [...Array(numWeaponsInTeam)].map(() => new WeaponPresetSlot());
    this.name = "";
  }

  public readonly id: TeamPresetId;
  public readonly characterId: CharacterId;
  public readonly weaponPresetSlots: WeaponPresetSlot[];
  public name: string;
}
