import { Stack } from "@mui/material";

import type { WeaponDefinition } from "../../../../definitions/types/weapon/weapon-definition";
import { WeaponDefinitionCard } from "../WeaponDefinitionCard/WeaponDefinitionCard";

export interface WeaponDefinitionListProps {
  weaponDefinitions: WeaponDefinition[];
  onClick?(weaponDefinition: WeaponDefinition): void;
}

export function WeaponDefinitionList({
  weaponDefinitions,
  onClick,
}: WeaponDefinitionListProps) {
  return (
    <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
      {weaponDefinitions.map((weaponDefinition) => {
        const {
          id,
          weaponDisplayName,
          simulacrumDisplayName,
          iconWeaponName,
          elementalIcon,
          type,
        } = weaponDefinition;

        return (
          <WeaponDefinitionCard
            key={id}
            id={id}
            weaponDisplayName={weaponDisplayName}
            simulacrumDisplayName={simulacrumDisplayName}
            iconWeaponName={iconWeaponName}
            elementalIcon={elementalIcon}
            type={type}
            onClick={() => {
              if (onClick) onClick(weaponDefinition);
            }}
            sx={{ width: 280 }}
          />
        );
      })}
    </Stack>
  );
}
