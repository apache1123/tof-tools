import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { Button } from "../Button/Button";

export interface SwapButtonProps extends PropsWithSx {
  onClick(): void;
}

export function SwapButton({ onClick, sx }: SwapButtonProps) {
  return (
    <Button
      icon={<SwapHorizontalCircleIcon />}
      buttonProps={{ variant: "text" }}
      onClick={onClick}
      sx={sx}
    >
      Swap
    </Button>
  );
}
