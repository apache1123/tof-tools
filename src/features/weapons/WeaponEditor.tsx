import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../components/common/Button/Button";
import { CardList } from "../../components/common/CardList/CardList";
import { WeaponDefinitionCardContent } from "../../components/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponPresetCard } from "../../components/weapon/WeaponPresetCard/WeaponPresetCard";
import { WeaponStarsSelector } from "../../components/weapon/WeaponStarsSelector/WeaponStarsSelector";
import type { Matrix } from "../../models/matrix/matrix";
import type { Weapon } from "../../models/weapon/weapon";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { WeaponPresetEditor } from "./WeaponPresetEditor";

export interface WeaponEditorProps {
  weaponProxy: Weapon;
  allMatrixProxies: Matrix[];
  weaponPresetProxies: WeaponPreset[];
  onAddPreset(): void;
}

export function WeaponEditor({
  weaponProxy,
  allMatrixProxies,
  weaponPresetProxies,
  onAddPreset,
}: WeaponEditorProps) {
  const weapon = useSnapshot(weaponProxy) as Weapon;
  const {
    definitionId,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
    stars,
  } = weapon;

  const weaponPresets = useSnapshot(weaponPresetProxies);

  const [editingPresetProxy, setEditingPresetProxy] = useState<
    WeaponPreset | undefined
  >(undefined);

  return (
    <>
      <Box>
        <Stack sx={{ alignItems: "center" }}>
          <WeaponDefinitionCardContent
            id={definitionId}
            weaponDisplayName={weaponDisplayName}
            simulacrumDisplayName={simulacrumDisplayName}
            iconWeaponName={iconWeaponName}
            elementalIcon={elementalIcon}
            type={type}
            iconSize={120}
          />
          <WeaponStarsSelector
            stars={stars}
            onStarsChange={(stars) => {
              weaponProxy.stars = stars;
            }}
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Presets
          </Typography>

          <Button onClick={onAddPreset} sx={{ mb: 1 }}>
            Add preset
          </Button>

          <CardList>
            {weaponPresets.map((weaponPreset) => {
              return (
                <WeaponPresetCard
                  key={weaponPreset.id}
                  weapon={weapon}
                  matrixSlots={weaponPreset.matrixSlots.getSlots()}
                  onClick={() => {
                    const weaponPresetProxy = weaponPresetProxies.find(
                      (weaponPresetProxy) =>
                        weaponPresetProxy.id === weaponPreset.id,
                    );
                    if (!weaponPresetProxy) {
                      throw new Error(
                        `Weapon preset proxy not found. Id: ${weaponPreset.id}`,
                      );
                    }

                    setEditingPresetProxy(weaponPresetProxy);
                  }}
                />
              );
            })}
          </CardList>
        </Box>
      </Box>

      {editingPresetProxy && (
        <WeaponPresetEditor
          weaponPresetProxy={editingPresetProxy}
          allMatrixProxies={allMatrixProxies}
          open={!!editingPresetProxy}
          onClose={() => {
            setEditingPresetProxy(undefined);
          }}
        />
      )}
    </>
  );
}
