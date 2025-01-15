import { CharacterPreset } from "../../models/character/character-preset";
import { exampleCharacterId } from "./character";
import { exampleGearSetPreset } from "./gear-set-preset";
import { exampleTeamPreset } from "./team-preset";

export const exampleCharacterPreset1 = new CharacterPreset(
  exampleCharacterId,
  "characterPresetId1",
);
exampleCharacterPreset1.teamPreset = exampleTeamPreset;
exampleCharacterPreset1.gearSetPreset = exampleGearSetPreset;

export const exampleCharacterPreset2 = new CharacterPreset(
  exampleCharacterId,
  "characterPresetId2",
);
exampleCharacterPreset2.teamPreset = exampleTeamPreset;
exampleCharacterPreset2.gearSetPreset = exampleGearSetPreset;

export const exampleCharacterPresets = [
  exampleCharacterPreset1,
  exampleCharacterPreset2,
];
