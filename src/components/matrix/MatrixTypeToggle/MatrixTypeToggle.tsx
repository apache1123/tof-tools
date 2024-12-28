import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { matrixTypes } from "../../../definitions/matrices/matrix-type";
import type { MatrixType } from "../../../models/matrix/matrix-type";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixTypeToggleProps {
  /** Array of selected matrix types. When exclusive is false, this will be one in the array. When exclusive is true, there can be multiple. */
  values: MatrixType[];
  exclusive?: boolean;
  /** Enforce at least one matrix type to be selected (except at initial state) i.e. cannot deselect all matrix types. */
  enforceAtLeastOne?: boolean;
  size?: number;
  /** @param values - Array of selected matrix type(s) (or empty array if none). */
  onChange?: (values: MatrixType[]) => void;
}

export function MatrixTypeToggle({
  values,
  exclusive,
  enforceAtLeastOne,
  size = 60,
  onChange,
}: MatrixTypeToggleProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={exclusive ? values[0] : values}
      exclusive={exclusive}
      onChange={(_, value) => {
        if (onChange) {
          if (
            enforceAtLeastOne &&
            ((exclusive && !value) || (!exclusive && value.length === 0))
          )
            return;

          onChange(exclusive ? (value === null ? [] : [value]) : value);
        }
      }}
      aria-label="Matrix Types"
      sx={{ flexWrap: "wrap" }}
    >
      {matrixTypes.map((matrixType) => {
        const { id, displayName } = matrixType;
        return (
          <ToggleButton key={id} value={matrixType} sx={{ p: 0.5 }}>
            <MatrixTypeIcon
              id={id}
              displayName={displayName}
              variant="large"
              size={size}
            />
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
