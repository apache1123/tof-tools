import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio/index";

import { Button } from "../../components/common/Button/Button";
import { CardList } from "../../components/common/CardList/CardList";
import { WeaponPresetCard } from "../../components/weapon/WeaponPresetCard/WeaponPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { Weapon } from "../../models/weapon/weapon";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { EditWeapon } from "./EditWeapon";
import { EditWeaponPreset } from "./EditWeaponPreset";

export interface EditWeaponAndPresetsProps {
  weaponProxy: Weapon;
  characterId: CharacterId;
}

export function EditWeaponAndPresets({
  weaponProxy,
  characterId,
}: EditWeaponAndPresetsProps) {
  const weapon = useSnapshot(weaponProxy) as Weapon;

  const weaponPresetRepo = db.get("weaponPresets");

  const weaponPresets = useSnapshot(weaponPresetRepo).filter(
    (weaponPreset) => weaponPreset.weapon.id === weaponProxy.id,
  );

  const [editingPresetProxy, setEditingPresetProxy] = useState<
    WeaponPreset | undefined
  >(undefined);

  return (
    weaponProxy && (
      <>
        <Box>
          <EditWeapon weaponProxy={weaponProxy} />

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Presets
            </Typography>

            <Button
              onClick={() => {
                weaponPresetRepo.add(new WeaponPreset(weaponProxy));
              }}
              sx={{ mb: 1 }}
            >
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
                      const weaponPresetProxy = weaponPresetRepo.find(
                        weaponPreset.id,
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
          <EditWeaponPreset
            weaponPresetProxy={editingPresetProxy}
            characterId={characterId}
            onFinish={() => {
              setEditingPresetProxy(undefined);
            }}
          />
        )}
      </>
    )
  );
}
