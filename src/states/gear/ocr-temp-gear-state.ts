import { proxy } from "valtio";

import type { CharacterId } from "../../models/character/character-data";
import { Gear } from "../../models/gear/gear";
import type { GearType } from "../../models/gear/gear-type";

export interface OcrTempGearState {
  tempGear: Gear | undefined;
  newTempGear(gearType: GearType, characterId: CharacterId): void;
  setTempGear(gear: Gear): void;
  removeTempGear(): void;
}

export const ocrTempGearState = proxy<OcrTempGearState>({
  tempGear: undefined,
  newTempGear(gearType: GearType, characterId: CharacterId) {
    ocrTempGearState.tempGear = new Gear(gearType, characterId);
  },
  setTempGear(gear: Gear): void {
    ocrTempGearState.tempGear = gear;
  },
  removeTempGear(): void {
    ocrTempGearState.tempGear = undefined;
  },
});
