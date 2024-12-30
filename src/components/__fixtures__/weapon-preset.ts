import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { exampleMatrixSlots } from "./matrix-slot";
import { exampleWeapon } from "./weapon";

export const exampleWeaponPreset1 = new WeaponPreset(
  exampleWeapon,
  "weaponPresetId",
  exampleMatrixSlots,
);

export const exampleWeaponPreset2 = new WeaponPreset(
  exampleWeapon,
  "weaponPresetId2",
);

export const exampleAllWeaponPresets = [
  exampleWeaponPreset1,
  exampleWeaponPreset2,
];
