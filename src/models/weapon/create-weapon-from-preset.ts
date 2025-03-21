import { Weapon } from "./weapon";
import type { WeaponPreset } from "./weapon-preset";

export function createWeaponFromPreset(preset: WeaponPreset): Weapon {
  const weapon = new Weapon(preset.definition);

  weapon.stars = preset.stars;
  weapon.matrixSlots.equipMatricesFrom(preset.matrixSlots);

  return weapon;
}
