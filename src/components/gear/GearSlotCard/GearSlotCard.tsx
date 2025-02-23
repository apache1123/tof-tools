import { Card, CardContent, CardHeader, Stack } from "@mui/material";

import type { Gear } from "../../../models/gear/gear";
import type { GearType } from "../../../models/gear/gear-type";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { RemoveFromSlotButton } from "../../common/RemoveFromSlotButton/RemoveFromSlotButton";
import { SwapButton } from "../../common/SwapButton/SwapButton";
import { GearCard } from "../GearCard/GearCard";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearSlotCardProps {
  type: GearType;
  gear: Gear | undefined;
  onEdit?(): void;
  onSwap?(): void;
  onRemove?(): void;
}

export function GearSlotCard({
  type,
  gear,
  onEdit,
  onSwap,
  onRemove,
}: GearSlotCardProps) {
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
          <Stack sx={{ gap: 0.5 }}>
            <GearCard gear={gear} elevation={1} onClick={onEdit} />
            <SwapButton
              onClick={() => {
                onSwap?.();
              }}
            />
            <RemoveFromSlotButton
              onClick={() => {
                onRemove?.();
              }}
            />
          </Stack>
        ) : (
          <AddToSlotButton
            onClick={() => {
              onSwap?.();
            }}
            sx={{ minHeight: 180 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
