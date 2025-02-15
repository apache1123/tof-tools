import { TextField } from "@mui/material";
import { useState } from "react";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { WeaponDefinitionCard } from "../WeaponDefinitionCard/WeaponDefinitionCard";

export interface WeaponDefinitionSelectorProps {
  weaponDefinitions: WeaponDefinition[];
  onSelect(weaponDefinition: WeaponDefinition): void;
}

export const WeaponDefinitionSelector = ({
  weaponDefinitions,
  onSelect,
}: WeaponDefinitionSelectorProps) => {
  const [nameFilter, setNameFilter] = useState("");

  const filteredWeaponDefinitions = weaponDefinitions.filter(
    (weaponDefinition) =>
      weaponDefinition.weaponDisplayName
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) ||
      weaponDefinition.simulacrumDisplayName
        .toLowerCase()
        .includes(nameFilter.toLowerCase()),
  );

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <TextField
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              label="Weapon or simulacra name"
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
            />
          }
          onResetFilter={() => {
            setNameFilter("");
          }}
        />
      }
      actions={undefined}
      items={filteredWeaponDefinitions.map((definition) => {
        const {
          id,
          weaponDisplayName,
          simulacrumDisplayName,
          iconWeaponId,
          elementalIcon,
          type,
        } = definition;

        return (
          <WeaponDefinitionCard
            key={id}
            id={id}
            weaponDisplayName={weaponDisplayName}
            simulacrumDisplayName={simulacrumDisplayName}
            iconWeaponId={iconWeaponId}
            elementalIcon={elementalIcon}
            type={type}
            onClick={() => {
              onSelect(definition);
            }}
            sx={{ width: 280 }}
          />
        );
      })}
    />
  );
};
