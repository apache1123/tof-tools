import { Card, CardContent, CardHeader } from "@mui/material";

import type { Gear } from "../../../../models/gear/gear";
import type { GearType } from "../../../../models/gear/gear-type";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { GearCard } from "../GearCard/GearCard";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearSlotCardProps {
  type: GearType;
  gear: Gear | undefined;
  onClick?(): void;
}

export function GearSlotCard({ type, gear, onClick }: GearSlotCardProps) {
  return (
    <Card sx={{ width: 200 }}>
      <CardHeader
        avatar={<GearTypeIcon id={type.id} size={40} monochromeWhite />}
        title={type.displayName}
        sx={{ p: 1 }}
      />
      <CardContent
        sx={{
          width: "100%",
          px: 1,
          pt: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {gear ? (
          <GearCard gear={gear} elevation={1} onClick={onClick} />
        ) : (
          <AddToSlotButton
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
            sx={{ minHeight: 180 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
