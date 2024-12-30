import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { Button } from "../Button/Button";

export interface RemoveFromSlotButtonProps extends PropsWithSx {
  onClick(): void;
}

export function RemoveFromSlotButton({
  onClick,
  sx,
}: RemoveFromSlotButtonProps) {
  return (
    <Button
      icon={<RemoveCircleIcon />}
      buttonProps={{ variant: "text" }}
      onClick={onClick}
      sx={sx}
    >
      Remove
    </Button>
  );
}
