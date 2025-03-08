import { proxy } from "valtio";

import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterPresetId } from "../../models/character-preset/character-preset";
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
}

export const gearCompareState = proxy<GearCompareState>(new GearCompareState());

export const gearCompareStateKey = "gearCompare";
