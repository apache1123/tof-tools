import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { exampleCharacterId } from "./character";
import { exampleMatrixSlots } from "./matrix-slot";

export const exampleWeaponPreset1 = new WeaponPreset(
  exampleCharacterId,
  getWeaponDefinition("King"),
  "weaponPresetId",
  exampleMatrixSlots,
);

export const exampleWeaponPreset2 = new WeaponPreset(
  exampleCharacterId,
  getWeaponDefinition("King"),
  "weaponPresetId2",
);

export const exampleAllWeaponPresets = [
  exampleWeaponPreset1,
  exampleWeaponPreset2,
];
