import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";

export interface BoxCheckboxProps {
  isChecked: boolean;
  onIsCheckedChange?(isChecked: boolean): void;
  title?: ReactNode;
  subtitle?: ReactNode;
  info?: ReactNode;
  additionalSelector?: ReactNode;
}

export function BoxCheckbox({
  isChecked,
  onIsCheckedChange,
  title,
  subtitle,
  info,
  additionalSelector,
}: BoxCheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onIsCheckedChange) onIsCheckedChange(event.target.checked);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={
          <Tooltip title={info} placement="top">
            <Box>
              <Typography textAlign="center" gutterBottom>
                {title}
              </Typography>
              <Typography textAlign="center" variant="caption" paragraph>
                {subtitle}
              </Typography>
            </Box>
          </Tooltip>
        }
        labelPlacement="top"
      ></FormControlLabel>
      {additionalSelector}
    </Paper>
  );
}
