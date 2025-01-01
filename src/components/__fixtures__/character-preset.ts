import { CharacterPreset } from "../../models/character/character-preset";
import { exampleCharacterId } from "./character";
import { exampleGearSetPreset } from "./gear-set-preset";
import { exampleTeamPreset } from "./team-preset";

export const exampleCharacterPreset = new CharacterPreset(
  exampleCharacterId,
  "characterPresetId",
);
exampleCharacterPreset.teamPreset = exampleTeamPreset;
exampleCharacterPreset.gearSetPreset = exampleGearSetPreset;
