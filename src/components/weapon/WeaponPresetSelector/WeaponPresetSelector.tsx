import { useState } from "react";

import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import { getAllWeaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type {
  WeaponPreset,
  WeaponPresetId,
} from "../../../models/weapon/weapon-preset";
import { WeaponDefinitionAutocomplete } from "../WeaponDefinitionAutocomplete/WeaponDefinitionAutocomplete";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetSelectorProps {
  weaponPresets: WeaponPreset[];
  onSelect(weaponPresetId: WeaponPresetId): void;
}

export function WeaponPresetSelector({
  weaponPresets,
  onSelect,
}: WeaponPresetSelectorProps) {
  const [definitionIdFilter, setDefinitionIdFilter] = useState<
    WeaponName | undefined
  >(undefined);

  const filteredWeaponPresets = weaponPresets.filter((weaponPreset) => {
    if (definitionIdFilter) {
      return weaponPreset.definition.id === definitionIdFilter;
    }

    return true;
  });

  const allWeaponDefinitions = getAllWeaponDefinitions();

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <WeaponDefinitionAutocomplete
              options={allWeaponDefinitions}
              value={allWeaponDefinitions.find(
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
      actions={undefined}
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
