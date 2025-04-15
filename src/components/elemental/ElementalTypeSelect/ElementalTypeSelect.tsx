import type { FormControlProps, SelectChangeEvent } from "@mui/material";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { ReactNode } from "react";

import type { ElementalType } from "../../../definitions/elemental-type";
import { ElementalStyledText } from "../ElementalStyledText/ElementalStyledText";
import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";

export interface ElementalTypeSelectProps {
  values: ElementalType[];
  possibleElements: ElementalType[];

  label?: ReactNode;
  size?: "small" | "medium";
  required?: boolean;
  variant?: FormControlProps["variant"];
  disabled?: boolean;

  onChange?(values: ElementalType[]): void;
}

export function ElementalTypeSelect({
  values,
  possibleElements,
  onChange,
  label = "Elemental type",
  size = "medium",
  required = false,
  variant = "standard",
  disabled,
}: ElementalTypeSelectProps) {
  const options = ["All", ...possibleElements] as const;

  const isAllElementsSelected = possibleElements.every((element) =>
    values.includes(element),
  );

  return (
    <FormControl
      variant={variant}
      fullWidth
      required={required}
      error={required && !values}
      size={size}
      disabled={disabled}
    >
      <InputLabel id="elemental-type-select-label">{label}</InputLabel>
      <Select
        labelId="elemental-type-select-label"
        id="elemental-type-select"
        value={
          // If all elements are selected, select the 'All' option along with all the elements
          isAllElementsSelected
            ? ["All", ...values]
            : (values as unknown as typeof options)
        }
        multiple
        label={label}
        onChange={(event: SelectChangeEvent<typeof options>) => {
          const values = event.target.value as typeof options;

          if (!onChange) return;

          if (values.includes("All")) {
            if (isAllElementsSelected) {
              onChange(values.filter((value) => value !== "All"));
            } else {
              onChange([...possibleElements]);
            }
          } else {
            if (isAllElementsSelected) {
              // This is when all elements were selected, then user clicks on 'All' to deselect all
              onChange([]);
            } else {
              onChange(values as unknown as ElementalType[]);
            }
          }
        }}
        renderValue={(selected) => {
          // Show only 'All' if all elements are selected
          const values = isAllElementsSelected ? ["All"] : selected;

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {values.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Box display="flex" alignItems="center">
              {option === "All" ? (
                "All"
              ) : (
                <>
                  <ElementalTypeIcon elementalType={option} />
                  <Box ml={1}>
                    <ElementalStyledText elementalType={option}>
                      {option}
                    </ElementalStyledText>
                  </Box>
                </>
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
