import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio/index";

import { Button } from "../../components/common/Button/Button";
import { CardList } from "../../components/common/CardList/CardList";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { WeaponDefinitionCardContent } from "../../components/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponPresetCard } from "../../components/weapon/WeaponPresetCard/WeaponPresetCard";
import { WeaponStarsSelector } from "../../components/weapon/WeaponStarsSelector/WeaponStarsSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { Weapon } from "../../models/weapon/weapon";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { WeaponPresetEditor } from "./WeaponPresetEditor";

export interface WeaponEditorProps {
  weaponProxy: Weapon;
  characterId: CharacterId;
}

export function WeaponEditor({ weaponProxy, characterId }: WeaponEditorProps) {
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
          <EditorModal
            modalContent={
              <WeaponPresetEditor
                weaponPresetProxy={editingPresetProxy}
                characterId={characterId}
              />
            }
            open={!!editingPresetProxy}
            onClose={() => {
              setEditingPresetProxy(undefined);
            }}
            maxWidth={false}
          />
        )}
      </>
    )
  );
}
