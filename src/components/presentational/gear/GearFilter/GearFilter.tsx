import { Button, Paper, Stack, Typography } from "@mui/material";

import type { GearFilter } from "../../../../states/gears/gear-filter";
import { GearTypeToggle } from "../GearTypeToggle/GearTypeToggle";

export interface GearFilterProps {
  filter: GearFilter;
  onChange(filter: GearFilter): void;
}

export function GearFilter({ filter, onChange }: GearFilterProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Gear Filter</Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onChange({ gearNames: [] })}
          >
            Reset
          </Button>
        </Stack>

        <GearTypeToggle
          values={filter.gearNames}
          onChange={(gearNames) => {
            onChange({ ...filter, gearNames });
          }}
        />
      </Stack>
    </Paper>
  );
}
