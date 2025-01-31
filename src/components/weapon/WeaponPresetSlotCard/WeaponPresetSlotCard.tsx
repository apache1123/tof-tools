import { Card, CardContent, Stack } from "@mui/material";

import type { WeaponPreset } from "../../../models/weapon/weapon-preset";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { Button } from "../../common/Button/Button";
import { RemoveFromSlotButton } from "../../common/RemoveFromSlotButton/RemoveFromSlotButton";
import { SwapButton } from "../../common/SwapButton/SwapButton";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetSlotCardProps extends PropsWithSx {
  weaponPreset: WeaponPreset | undefined;
  disabled?: boolean;
  showSetAsMainButton?: boolean;
  onEdit(): void;
  onSwap(): void;
  onRemove(): void;
  onSetAsMain?(): void;
}

export function WeaponPresetSlotCard({
  weaponPreset,
  disabled,
  showSetAsMainButton,
  onEdit,
  onSwap,
  onRemove,
  onSetAsMain,
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
          alignItems: "center",
        }}
      >
        <>
          {weaponPreset ? (
            <>
              <WeaponPresetCard
                weapon={weaponPreset.weapon}
                matrixSlots={weaponPreset.matrixSlots.getSlots()}
                onClick={onEdit}
                elevation={1}
                sx={{ width: "100%" }}
              />
              <Stack sx={{ mt: 0.5, width: "100%", gap: 0.5 }}>
                <SwapButton onClick={onSwap} />
                <RemoveFromSlotButton onClick={onRemove} />
                {showSetAsMainButton && onSetAsMain && (
                  <Button
                    buttonProps={{ variant: "text" }}
                    onClick={onSetAsMain}
                  >
                    Set as main weapon
                  </Button>
                )}
              </Stack>
            </>
          ) : (
            <AddToSlotButton
              title="Add weapon preset"
              onClick={onSwap}
              buttonProps={{ disabled }}
            />
          )}
        </>
      </CardContent>
    </Card>
  );
}
