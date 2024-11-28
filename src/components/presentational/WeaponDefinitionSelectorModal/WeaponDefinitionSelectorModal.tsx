import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import { StyledModal } from "../Modal/StyledModal";
import { WeaponDefinitionList } from "../WeaponDefinitionList/WeaponDefinitionList";

export interface WeaponDefinitionSelectorModalProps {
  open: boolean;
  weaponDefinitions: WeaponDefinition[];
  onSelect(weaponDefinition: WeaponDefinition): void;
  onCancel(): void;
}

export const WeaponDefinitionSelectorModal = ({
  open,
  weaponDefinitions,
  onSelect,
  onCancel,
}: WeaponDefinitionSelectorModalProps) => {
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
    <StyledModal
      open={open}
      modalContent={
        <Stack sx={{ gap: 2 }}>
          <TextField
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            label="Weapon name"
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          />
          <WeaponDefinitionList
            weaponDefinitions={filteredWeaponDefinitions}
            onClick={(weaponDefinition) => {
              onSelect(weaponDefinition);
            }}
          />
        </Stack>
      }
      showCancel
      onClose={onCancel}
      maxWidth={false}
      fullWidth
    ></StyledModal>
  );
};
