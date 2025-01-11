import { nanoid } from "nanoid";

import type { GearSetPreset } from "../gear/gear-set-preset";
import type { Id } from "../identifiable";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { TeamPreset } from "../team/team-preset";
import type { CharacterId } from "./character-data";

export type CharacterPresetId = Id;

/** A character preset is a user-created template of how a character is to be equipped - weapons, matrices, gear, trait etc. */
export class CharacterPreset {
  public constructor(characterId: CharacterId, id?: CharacterPresetId) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.name = "";
  }

  public readonly id: CharacterPresetId;
  public readonly characterId: CharacterId;
  public teamPreset: TeamPreset | undefined;
  public gearSetPreset: GearSetPreset | undefined;
  public name: string;
  public simulacrumTrait: SimulacrumTrait | undefined;
}
