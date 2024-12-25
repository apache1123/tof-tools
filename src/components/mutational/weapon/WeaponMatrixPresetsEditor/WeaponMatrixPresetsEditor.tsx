import { Paper, Stack, Typography } from "@mui/material";
import { useSnapshot } from "valtio";

import type { MatrixPreset } from "../../../../models/matrix/matrix-preset";
import type { Weapon } from "../../../../models/weapon/weapon";
import { Button } from "../../../presentational/common/Button/Button";
import { MatrixPresetCard } from "../../../presentational/matrix/MatrixPresetCard/MatrixPresetCard";

export interface WeaponMatrixPresetsEditorProps {
  weaponProxy: Weapon;
  matrixPresetProxies: MatrixPreset[];
  onAdd(): void;
}

export function WeaponMatrixPresetsEditor({
  weaponProxy,
  matrixPresetProxies,
  onAdd,
}: WeaponMatrixPresetsEditorProps) {
  const matrixPresets = useSnapshot(matrixPresetProxies);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Matrix Presets
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
        {matrixPresets.map((matrixPreset) => {
          const matrixPresetProxy = matrixPresetProxies.find(
            (matrixPresetProxy) => matrixPresetProxy.id === matrixPreset.id,
          );

          return (
            <MatrixPresetCard
              key={matrixPreset.id}
              matrixSlots={matrixPreset.matrixSlots.getSlots()}
              onSave={() => {
                if (matrixPresetProxy) {
                  matrixPresetProxy.matrixSlots.equipMatricesFrom(
                    weaponProxy.matrixSlots,
                  );
                }
              }}
              onUse={() => {
                if (matrixPresetProxy) {
                  weaponProxy.matrixSlots.equipMatricesFrom(
                    matrixPresetProxy.matrixSlots,
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
