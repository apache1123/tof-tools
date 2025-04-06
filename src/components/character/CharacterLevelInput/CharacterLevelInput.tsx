import { Box } from "@mui/material";

import { maxCharacterLevel } from "../../../definitions/character-level";
import { NumericInput } from "../../common/NumericInput/NumericInput";

export interface CharacterLevelInputProps {
  value: number;
  onChange(value: number): void;
}

export function CharacterLevelInput({
  value,
  onChange,
}: CharacterLevelInputProps) {
  return (
    <NumericInput
      id="char-level"
      label="Wanderer level"
      variant="outlined"
      value={value}
      onChangeCommitted={onChange}
      helperText={
        value !== maxCharacterLevel ? (
          <Box
            component="span"
            sx={{ color: (theme) => theme.palette.warning.main }}
          >
            Current max wanderer level is {maxCharacterLevel}
          </Box>
        ) : undefined
      }
    />
  );
}
