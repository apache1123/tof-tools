import { useState } from "react";

import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddWeaponPreset } from "../../../features/weapon/AddWeaponPreset";
import type { CharacterId } from "../../../models/character/character-data";
import type {
  WeaponPreset,
  WeaponPresetId,
} from "../../../models/weapon/weapon-preset";
import type { WeaponPresetFilter } from "../../../models/weapon/weapon-preset-filter";
import {
  getEmptyWeaponPresetFilter,
  getFilteredWeaponPresets,
} from "../../../models/weapon/weapon-preset-filter";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";
import { WeaponPresetFilterEditor } from "../WeaponPresetFilterEditor/WeaponPresetFilterEditor";

export interface WeaponPresetSelectorProps {
  characterId: CharacterId;
  weaponPresets: WeaponPreset[];
  onSelect(weaponPresetId: WeaponPresetId): void;
}

export function WeaponPresetSelector({
  characterId,
  weaponPresets,
  onSelect,
}: WeaponPresetSelectorProps) {
  const [filter, setFilter] = useState<WeaponPresetFilter>(
    getEmptyWeaponPresetFilter(),
  );

  const filteredWeaponPresets = getFilteredWeaponPresets(weaponPresets, filter);

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <WeaponPresetFilterEditor filter={filter} onChange={setFilter} />
          }
          onResetFilter={() => {
            setFilter(getEmptyWeaponPresetFilter());
          }}
        />
      }
      actions={
        <AddWeaponPreset
          characterId={characterId}
          buttonText="Add weapon preset"
          onAdded={(id) => {
            // Automatically select the newly created preset
            onSelect(id);
          }}
        />
      }
      items={filteredWeaponPresets.map((weaponPreset) => (
        <WeaponPresetCard
          key={weaponPreset.id}
          weaponDefinition={weaponPreset.definition}
          stars={weaponPreset.stars}
          matrixSlots={weaponPreset.matrixSlots.getSlots()}
          onClick={() => onSelect(weaponPreset.id)}
        />
      ))}
    />
  );
}
