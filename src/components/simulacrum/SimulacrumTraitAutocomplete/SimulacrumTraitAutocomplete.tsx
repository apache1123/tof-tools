import { Autocomplete, Box, ListItem, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import { getAllSimulacrumTraits } from "../../../definitions/simulacra/simulacrum-traits";
import type { SimulacrumTrait } from "../../../models/simulacrum-trait";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { SimulacrumIcon } from "../SimulacrumIcon/SimulacrumIcon";

export interface SimulacrumTraitAutocompleteProps extends PropsWithSx {
  value: SimulacrumTrait | undefined;
  onChange(value: SimulacrumTrait | undefined): void;
}

const options = getAllSimulacrumTraits();
const iconSize = 60;

export function SimulacrumTraitAutocomplete({
  value,
  onChange,
  sx,
}: SimulacrumTraitAutocompleteProps) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: "center", ...sx }}>
      <Box sx={{ width: iconSize, height: iconSize }}>
        {value && <SimulacrumIcon simulacrumId={value.id} size={iconSize} />}
      </Box>

      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Simulacrum trait" />
        )}
        renderOption={(props, trait) => (
          <ListItem {...props} key={trait.id}>
            <Option trait={trait} />
          </ListItem>
        )}
        getOptionLabel={(option) => option.displayName}
        value={value ?? null}
        onChange={(_, value) => {
          onChange(value ?? undefined);
        }}
        sx={{ flex: "auto" }}
      />
    </Stack>
  );
}

function Option({ trait }: { trait: SimulacrumTrait }) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
      <SimulacrumIcon simulacrumId={trait.id} size={iconSize} />
      <Typography>{trait.displayName}</Typography>
    </Stack>
  );
}
