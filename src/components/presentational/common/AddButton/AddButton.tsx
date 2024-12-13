import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { SxProps } from "@mui/material";
import { Button } from "@mui/material";

export interface AddButtonProps {
  iconSize?: number;
  sx?: SxProps;

  onClick(): void;
}

export function AddButton({ onClick, iconSize = 40, sx }: AddButtonProps) {
  return (
    <Button sx={{ width: "100%", height: "100%", ...sx }} onClick={onClick}>
      <AddCircleIcon sx={{ fontSize: iconSize }} />
    </Button>
  );
}
