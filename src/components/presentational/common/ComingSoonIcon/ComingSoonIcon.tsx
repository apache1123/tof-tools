import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import type { HasSxProps } from "../../../helpers/has-sx-props";

export type ComingSoonIconProps = HasSxProps;

export function ComingSoonIcon({ sx }: ComingSoonIconProps) {
  return (
    <Tooltip title="Not yet implemented. Coming later">
      <InfoIcon sx={{ color: (theme) => theme.palette.warning.main, ...sx }} />
    </Tooltip>
  );
}
