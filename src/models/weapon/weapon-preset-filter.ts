import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import type { WeaponPreset } from "./weapon-preset";

export interface WeaponPresetFilter {
  definitionId?: WeaponDefinitionId;
}

export function getEmptyWeaponPresetFilter(): WeaponPresetFilter {
  return {};
}

export function getFilteredWeaponPresets(
  weaponPresets: WeaponPreset[],
  filter: WeaponPresetFilter,
) {
  const { definitionId } = filter;

  return weaponPresets.filter((weaponPreset) => {
    if (definitionId) {
      return weaponPreset.definition.id === definitionId;
    }

    return true;
  });
}
