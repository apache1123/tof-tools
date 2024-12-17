import { GearSetPreset } from "../../models/gear/gear-set-preset";
import { exampleCharacterId } from "./character";
import { exampleGearSet } from "./gear-set";

export const exampleGearSetPreset = new GearSetPreset(
  exampleCharacterId,
  "gearSetPresetId",
  exampleGearSet,
);
exampleGearSetPreset.name = "Gear Preset Name";
