import { proxy } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterPresetId } from "../../models/character/character-preset";
import type { GearId } from "../../models/gear/gear";

export class GearCompareState {
  public characterPresetId: CharacterPresetId | undefined = undefined;
  public newGearId: GearId | undefined = undefined;
  private _gearTypeId: GearTypeId | undefined = undefined;

  public get gearTypeId(): GearTypeId | undefined {
    return this._gearTypeId;
  }
  public set gearTypeId(id: GearTypeId) {
    this._gearTypeId = id;
    this.newGearId = undefined;
  }

  public getCharacterPreset() {
    return this.characterPresetId
      ? db.get("characterPresets").find(this.characterPresetId)
      : undefined;
  }

  public getCurrentGear() {
    const characterPreset = this.getCharacterPreset();
    if (!characterPreset || !this.gearTypeId) return undefined;

    return characterPreset.gearSetPreset?.gearSet?.getSlot(this.gearTypeId)
      .gear;
  }

  public getNewGear() {
    return this.newGearId ? db.get("gears").find(this.newGearId) : undefined;
  }
}

export const gearCompareState = proxy<GearCompareState>(new GearCompareState());

export const gearCompareStateKey = "gearCompare";
