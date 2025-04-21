import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { allElementalTypes } from "../../../definitions/elemental-type";
import type { ElementalBuffDefinition } from "../../../definitions/types/buff/elemental-buff-definition";
import { NumericInput } from "../../common/NumericInput/NumericInput";
import { ElementalTypeSelect } from "../../elemental/ElementalTypeSelect/ElementalTypeSelect";

export interface ElementalBuffInputProps {
  buff: ElementalBuffDefinition | undefined;
  percentageMode: boolean;
  label: string;
  helperText?: string;

  onChange(buff: ElementalBuffDefinition): void;
}

export function ElementalBuffInput({
  buff,
  percentageMode,
  onChange,
  label,
  helperText,
}: ElementalBuffInputProps) {
  const [state, setState] = useState<ElementalBuffDefinition>({
    elementalTypes: [],
    value: 0,
  });
  const { elementalTypes, value } = state;

  useEffect(() => {
    if (buff) {
      setState({
        elementalTypes: buff.elementalTypes,
        value: buff.value,
      });
    }
  }, [buff, buff?.elementalTypes, buff?.value]);

  return (
    <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap" }}>
      <Box sx={{ width: 170 }}>
        <NumericInput
          value={value}
          percentageMode={percentageMode}
          onChangeCommitted={(value) => {
            const newState = {
              ...state,
              value,
            };
            setState(newState);
            onChange(newState);
          }}
          label={label}
          helperText={helperText}
        />
      </Box>

      <Box sx={{ width: 300 }}>
        <ElementalTypeSelect
          values={elementalTypes}
          possibleElements={[...allElementalTypes]}
          onChange={(elementalTypes) => {
            const newState = {
              ...state,
              elementalTypes,
            };
            setState(newState);
            onChange(newState);
          }}
          required={value !== 0}
          label={`${label} element`}
        />
      </Box>
    </Stack>
  );
}
