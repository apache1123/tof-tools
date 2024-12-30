import { TeamPreset } from "../../models/team/team-preset";
import { exampleCharacterId } from "./character";
import { exampleWeaponPreset1, exampleWeaponPreset2 } from "./weapon-preset";

export const exampleTeamPreset = new TeamPreset(
  exampleCharacterId,
  "teamPresetId",
);
exampleTeamPreset.weaponPresetSlots[0].weaponPreset = exampleWeaponPreset1;
exampleTeamPreset.weaponPresetSlots[1].weaponPreset = exampleWeaponPreset2;
