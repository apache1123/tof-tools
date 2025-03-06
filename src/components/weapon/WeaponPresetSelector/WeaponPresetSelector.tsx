import groupBy from "lodash.groupby";
import { useState } from "react";

import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddWeaponPreset } from "../../../features/weapon/AddWeaponPreset";
import type { CharacterId } from "../../../models/character/character-data";
import type {
  WeaponPreset,
  WeaponPresetId,
} from "../../../models/weapon/weapon-preset";
import { keysOf } from "../../../utils/object-utils";
import { WeaponDefinitionAutocomplete } from "../WeaponDefinitionAutocomplete/WeaponDefinitionAutocomplete";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

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
  // Get list of unique weapon definitions used by the weapon presets
  const weaponPresetsByDefinitionId = groupBy(
    weaponPresets,
    (weaponPreset) => weaponPreset.definition.id,
  );
  const nonUniqueWeaponDefinitions = keysOf(weaponPresetsByDefinitionId).map(
    (definitionId) => {
      return weaponPresetsByDefinitionId[definitionId][0].definition;
    },
  );
  const weaponDefinitions = [...new Set(nonUniqueWeaponDefinitions)];

  const [definitionIdFilter, setDefinitionIdFilter] = useState<
    WeaponDefinitionId | undefined
  >(undefined);

  const filteredWeaponPresets = weaponPresets.filter((weaponPreset) => {
    if (definitionIdFilter) {
      return weaponPreset.definition.id === definitionIdFilter;
    }

    return true;
  });

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <WeaponDefinitionAutocomplete
              options={weaponDefinitions}
              value={weaponDefinitions.find(
                (definition) => definition.id === definitionIdFilter,
              )}
              onChange={(value) => setDefinitionIdFilter(value?.id)}
            />
          }
          onResetFilter={() => {
            setDefinitionIdFilter(undefined);
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
