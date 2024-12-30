import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack } from "@mui/material";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { Button } from "../Button/Button";

export interface AddToSlotButtonProps extends PropsWithSx {
  iconSize?: number;
  title?: string;

  onClick(): void;
}

export function AddToSlotButton({
  onClick,
  iconSize = 40,
  title,
  sx,
}: AddToSlotButtonProps) {
  return (
    <Button
      buttonProps={{ variant: "text" }}
      sx={{ width: "100%", height: "100%", ...sx }}
      onClick={onClick}
    >
      <Stack sx={{ gap: 1, alignItems: "center" }}>
        <AddCircleIcon sx={{ fontSize: iconSize }} />
        {title}
      </Stack>
    </Button>
  );
}
