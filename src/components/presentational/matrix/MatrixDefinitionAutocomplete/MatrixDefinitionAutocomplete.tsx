import { Autocomplete, Chip, ListItem, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

import type { MatrixDefinition } from "../../../../definitions/types/matrix/matrix-definition";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";

export interface MatrixDefinitionAutocompleteProps {
  options: MatrixDefinition[];
  values: MatrixDefinition[];
  onChange(values: MatrixDefinition[]): void;
}

export function MatrixDefinitionAutocomplete({
  options,
  values,
  onChange,
}: MatrixDefinitionAutocompleteProps) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Matrices" />}
      renderOption={(props, definition) => (
        <ListItem {...props} key={definition.id}>
          <Option definition={definition} iconSize={60} />
        </ListItem>
      )}
      getOptionLabel={(option) => option.displayName}
      renderTags={(definitions, getTagProps) =>
        definitions.map((definition, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              {...tagProps}
              label={<Option definition={definition} iconSize={50} />}
            />
          );
        })
      }
      multiple
      value={values}
      onChange={(_, value) => {
        onChange(value);
      }}
    />
  );
}

function Option({
  definition,
  iconSize,
}: {
  definition: MatrixDefinition;
  iconSize: number;
}) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
      <MatrixIcon
        definitionId={definition.id}
        displayName={definition.displayName}
        size={iconSize}
        sx={{ mt: -1.5, mr: -1.5, mb: -2.5, ml: -1 }}
      />
      {definition.displayName}
    </Stack>
  );
}
