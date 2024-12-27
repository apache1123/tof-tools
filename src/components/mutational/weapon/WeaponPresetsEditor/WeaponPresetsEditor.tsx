import { Paper, Stack, Typography } from "@mui/material";
import { useSnapshot } from "valtio";

import type { Weapon } from "../../../../models/weapon/weapon";
import type { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { Button } from "../../../presentational/common/Button/Button";
import { WeaponPresetCard } from "../../../presentational/weapon/WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetsEditorProps {
  weaponProxy: Weapon;
  weaponPresetProxies: WeaponPreset[];
  onAdd(): void;
}

export function WeaponPresetsEditor({
  weaponProxy,
  weaponPresetProxies,
  onAdd,
}: WeaponPresetsEditorProps) {
  const weaponPresets = useSnapshot(weaponPresetProxies);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weapon Presets
      </Typography>

      <Button
        onClick={() => {
          onAdd();
        }}
        sx={{ mb: 1 }}
      >
        Add preset
      </Button>

      <Stack sx={{ gap: 1 }}>
        {weaponPresets.map((weaponPreset) => {
          const weaponPresetProxy = weaponPresetProxies.find(
            (weaponPresetProxy) => weaponPresetProxy.id === weaponPreset.id,
          );

          return (
            <WeaponPresetCard
              key={weaponPreset.id}
              matrixSlots={weaponPreset.matrixSlots.getSlots()}
              onSave={() => {
                if (weaponPresetProxy) {
                  weaponPresetProxy.matrixSlots.equipMatricesFrom(
                    weaponProxy.matrixSlots,
                  );
                }
              }}
              onUse={() => {
                if (weaponPresetProxy) {
                  weaponProxy.matrixSlots.equipMatricesFrom(
                    weaponPresetProxy.matrixSlots,
                  );
                }
              }}
            />
          );
        })}
      </Stack>
    </Paper>
  );
}
