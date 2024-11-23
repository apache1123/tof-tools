import InfoIcon from "@mui/icons-material/Info";
import { SxProps, Tooltip } from "@mui/material";

export interface ComingSoonIconProps {
  sx?: SxProps;
}

export function ComingSoonIcon({ sx }: ComingSoonIconProps) {
  return (
    <Tooltip title="Not yet implemented. Coming later">
      <InfoIcon sx={{ color: (theme) => theme.palette.warning.main, ...sx }} />
    </Tooltip>
  );
}
