import { getAllWeaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponPresetFilter } from "../../../models/weapon/weapon-preset-filter";
import { WeaponDefinitionAutocomplete } from "../WeaponDefinitionAutocomplete/WeaponDefinitionAutocomplete";

export interface WeaponPresetFilterEditorProps {
  filter: WeaponPresetFilter;
  onChange(filter: WeaponPresetFilter): void;
}

export function WeaponPresetFilterEditor({
  filter,
  onChange,
}: WeaponPresetFilterEditorProps) {
  const allDefinitions = getAllWeaponDefinitions();

  return (
    <WeaponDefinitionAutocomplete
      options={allDefinitions}
      value={allDefinitions.find(
        (definition) => definition.id === filter.definitionId,
      )}
      onChange={(definition) => {
        onChange({
          ...filter,
          definitionId: definition?.id,
        });
      }}
    />
  );
}
