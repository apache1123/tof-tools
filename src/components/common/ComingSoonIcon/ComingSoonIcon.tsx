import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export type ComingSoonIconProps = PropsWithSx;

export function ComingSoonIcon({ sx }: ComingSoonIconProps) {
  return (
    <Tooltip title="Not yet implemented. Coming later">
      <InfoIcon sx={{ color: (theme) => theme.palette.warning.main, ...sx }} />
    </Tooltip>
  );
}
