import AddCircleIcon from "@mui/icons-material/AddCircle";

import type { HasSxProps } from "../../__helpers__/has-sx-props";
import { Button } from "../Button/Button";

export interface AddToSlotButtonProps extends HasSxProps {
  iconSize?: number;

  onClick(): void;
}

export function AddToSlotButton({
  onClick,
  iconSize = 40,
  sx,
}: AddToSlotButtonProps) {
  return (
    <Button
      buttonProps={{ variant: "text" }}
      sx={{ width: "100%", height: "100%", ...sx }}
      onClick={onClick}
    >
      <AddCircleIcon sx={{ fontSize: iconSize }} />
    </Button>
  );
}
