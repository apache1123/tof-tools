import { nanoid } from "nanoid";

import type { CharacterId } from "../character/character";
import type { Id } from "../identifiable";
import { GearSet } from "./gear-set";

export type GearSetPresetId = Id;

export class GearSetPreset {
  public constructor(
    characterId: CharacterId,
    id?: GearSetPresetId,
    gearSet?: GearSet,
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.name = "";
    this.gearSet = gearSet ?? new GearSet();
  }

  public readonly id: GearSetPresetId;
  public readonly characterId: CharacterId;
  public name: string;
  public readonly gearSet: GearSet;
}
