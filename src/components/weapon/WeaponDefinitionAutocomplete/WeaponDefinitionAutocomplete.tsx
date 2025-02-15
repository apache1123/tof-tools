import { Autocomplete, ListItem, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";

export interface WeaponDefinitionAutocompleteProps {
  options: WeaponDefinition[];
  value: WeaponDefinition | undefined;
  onChange(value: WeaponDefinition | undefined): void;
}

export function WeaponDefinitionAutocomplete({
  options,
  value,
  onChange,
}: WeaponDefinitionAutocompleteProps) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Weapon" />}
      renderOption={(props, definition) => (
        <ListItem {...props} key={definition.id} sx={{ minHeight: 70 }}>
          <Option definition={definition} iconSize={60} />
        </ListItem>
      )}
      getOptionLabel={(option) =>
        `${option.weaponDisplayName} (${option.simulacrumDisplayName})`
      }
      value={value ?? null}
      onChange={(_, value) => {
        onChange(value ?? undefined);
      }}
    />
  );
}

function Option({
  definition,
  iconSize,
}: {
  definition: WeaponDefinition;
  iconSize: number;
}) {
  const {
    id,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
  } = definition;
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
      <WeaponIcon
        weaponName={id}
        iconWeaponName={iconWeaponName}
        elementalIcon={elementalIcon}
        weaponType={type}
        size={iconSize}
        sx={{ mt: -0.5 }}
      />

      <Stack direction="row" sx={{ gap: 1, alignItems: "baseline" }}>
        <Typography variant="body1">{weaponDisplayName}</Typography>

        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {simulacrumDisplayName}
        </Typography>
      </Stack>
    </Stack>
  );
}
