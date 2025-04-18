import { Autocomplete, Box, ListItem, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import {
  getAllSimulacrumTraits,
  getSimulacrumTrait,
} from "../../../definitions/simulacra/simulacrum-traits";
import type {
  SimulacrumTrait,
  SimulacrumTraitId,
} from "../../../models/simulacrum-trait";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { SimulacrumIcon } from "../SimulacrumIcon/SimulacrumIcon";

export interface SimulacrumTraitAutocompleteProps extends PropsWithSx {
  value: SimulacrumTraitId | undefined;
  onChange(value: SimulacrumTraitId | undefined): void;
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
        {value && <SimulacrumIcon simulacrumId={value} size={iconSize} />}
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
        value={value ? getSimulacrumTrait(value) : null}
        onChange={(_, trait) => {
          onChange(trait?.id);
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
