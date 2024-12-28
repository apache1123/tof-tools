import AddCircleIcon from "@mui/icons-material/AddCircle";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { Button } from "../Button/Button";

export interface AddToSlotButtonProps extends PropsWithSx {
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
