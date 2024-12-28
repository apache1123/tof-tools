import { Card, CardActionArea, CardContent } from "@mui/material";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import type { WeaponCardContentProps } from "./WeaponCardContent";
import { WeaponCardContent } from "./WeaponCardContent";

export interface WeaponCardProps extends WeaponCardContentProps, PropsWithSx {
  onClick?(): void;
}

export function WeaponCard({ weapon, sx, onClick }: WeaponCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick();
        }}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ p: 2, pt: 0 }}>
          <WeaponCardContent weapon={weapon} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
