import { TeamPreset } from "../../models/team/team-preset";
import { exampleCharacterId } from "./character";
import { exampleWeaponPreset1, exampleWeaponPreset2 } from "./weapon-preset";

export const exampleTeamPreset = new TeamPreset(
  exampleCharacterId,
  "teamPresetId",
);
exampleTeamPreset.setWeaponPreset(0, exampleWeaponPreset1);
exampleTeamPreset.setWeaponPreset(1, exampleWeaponPreset2);

export const exampleTeamPresetEmpty = new TeamPreset(exampleCharacterId);
