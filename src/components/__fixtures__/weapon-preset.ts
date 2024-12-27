import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { exampleMatrixSlots } from "./matrix-slot";
import { exampleWeaponId } from "./weapon";

export const exampleWeaponPreset1 = new WeaponPreset(
  exampleWeaponId,
  "weaponPresetId",
  exampleMatrixSlots,
);

export const exampleWeaponPreset2 = new WeaponPreset(
  exampleWeaponId,
  "weaponPresetId2",
);

export const exampleAllWeaponPresets = [
  exampleWeaponPreset1,
  exampleWeaponPreset2,
];
