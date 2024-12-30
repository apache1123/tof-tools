import { Card, CardContent } from "@mui/material";

import type { WeaponPreset } from "../../../models/weapon/weapon-preset";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { RemoveFromSlotButton } from "../../common/RemoveFromSlotButton/RemoveFromSlotButton";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetSlotCardProps extends PropsWithSx {
  weaponPreset: WeaponPreset | undefined;
  onClick(): void;
  onRemove(): void;
}

export function WeaponPresetSlotCard({
  weaponPreset,
  onClick,
  onRemove,
  sx,
}: WeaponPresetSlotCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          {weaponPreset ? (
            <>
              <WeaponPresetCard
                weapon={weaponPreset.weapon}
                matrixSlots={weaponPreset.matrixSlots.getSlots()}
                onClick={onClick}
                elevation={1}
                sx={{ width: "100%" }}
              />
              <RemoveFromSlotButton
                onClick={onRemove}
                sx={{ width: "100%", mt: 0.5 }}
              />
            </>
          ) : (
            <AddToSlotButton title="Add weapon preset" onClick={onClick} />
          )}
        </>
      </CardContent>
    </Card>
  );
}
