import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import { CardList } from "../../common/CardList/CardList";
import { StyledModal } from "../../common/Modal/StyledModal";
import { WeaponDefinitionCard } from "../WeaponDefinitionCard/WeaponDefinitionCard";

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

          <CardList>
            {filteredWeaponDefinitions.map((definition) => {
              const {
                id,
                weaponDisplayName,
                simulacrumDisplayName,
                iconWeaponName,
                elementalIcon,
                type,
              } = definition;

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
                    onSelect(definition);
                  }}
                  sx={{ width: 280 }}
                />
              );
            })}
          </CardList>
        </Stack>
      }
      showCancel
      onClose={onCancel}
      maxWidth={false}
      fullWidth
    ></StyledModal>
  );
};
