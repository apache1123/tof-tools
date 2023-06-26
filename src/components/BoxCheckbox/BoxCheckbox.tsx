import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

export interface BoxCheckboxProps {
  isChecked: boolean;
  onIsCheckedChange?(isChecked: boolean);
  title?: ReactNode;
  subtitle?: ReactNode;
  additionalSelector?: ReactNode;
}

export function BoxCheckbox({
  isChecked,
  onIsCheckedChange,
  title,
  subtitle,
  additionalSelector,
}: BoxCheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onIsCheckedChange) onIsCheckedChange(event.target.checked);
  };

  return (
    <Paper
      elevation={1}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={
          <>
            <Typography textAlign="center" gutterBottom>
              {title}
            </Typography>
            <Typography textAlign="center">{subtitle}</Typography>
          </>
        }
        labelPlacement="top"
      ></FormControlLabel>
      {additionalSelector}
    </Paper>
  );
}
