import { nanoid } from "nanoid";

import type { CharacterId } from "../character/character";
import type { Id } from "../identifiable";
import { GearSet } from "./gear-set";

export type GearPresetId = Id;

export class GearSetPreset {
  public constructor(characterId: CharacterId, id?: GearPresetId) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.name = "";
    this.gearSet = new GearSet();
  }

  public readonly id: GearPresetId;
  public readonly characterId: CharacterId;
  public name: string;
  public readonly gearSet: GearSet;
}
