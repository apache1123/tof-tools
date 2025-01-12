import { Card, CardContent, Stack } from "@mui/material";

import type { WeaponPreset } from "../../../models/weapon/weapon-preset";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { Button } from "../../common/Button/Button";
import { RemoveFromSlotButton } from "../../common/RemoveFromSlotButton/RemoveFromSlotButton";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetSlotCardProps extends PropsWithSx {
  weaponPreset: WeaponPreset | undefined;
  disabled?: boolean;
  showSetAsMainButton?: boolean;
  onClick(): void;
  onRemove(): void;
  onSetAsMain?(): void;
}

export function WeaponPresetSlotCard({
  weaponPreset,
  disabled,
  showSetAsMainButton,
  onClick,
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
              <Stack sx={{ mt: 0.5, width: "100%", gap: 0.5 }}>
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
              onClick={onClick}
              buttonProps={{ disabled }}
            />
          )}
        </>
      </CardContent>
    </Card>
  );
}
