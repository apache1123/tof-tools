import type { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from "@mui/material";
import { ToggleButtonGroup as MuiToggleButtonGroup } from "@mui/material";
import React from "react";

export interface ToggleButtonGroupProps<T> extends MuiToggleButtonGroupProps {
  /** Array of selected values. When exclusive is false, this will be one in the array. When exclusive is true, there can be multiple. */
  value: T[];
  /** Enforce at least one value to be selected (except at initial state) i.e. cannot deselect all values. */
  enforceAtLeastOne?: boolean;
  /** @param value - Array of selected value(s) (or empty array if none). */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: T[]) => void;
}

/** Extends Mui ToggleButtonGroup to have easier typings to work with for props `value` and `onChange(_, value)`. Also allows  ability to enforce at least one value to be selected. */
export function ToggleButtonGroup<T>({
  value,
  exclusive,
  enforceAtLeastOne,
  onChange,
  children,
  ...rest
}: ToggleButtonGroupProps<T>) {
  return (
    <MuiToggleButtonGroup
      color="primary"
      value={exclusive ? value[0] : value}
      exclusive={exclusive}
      onChange={(e, value) => {
        if (onChange) {
          if (
            enforceAtLeastOne &&
            ((exclusive && !value) || (!exclusive && value.length === 0))
          )
            return;

          onChange(e, exclusive ? (value === null ? [] : [value]) : value);
        }
      }}
      {...rest}
    >
      {children}
    </MuiToggleButtonGroup>
  );
}
