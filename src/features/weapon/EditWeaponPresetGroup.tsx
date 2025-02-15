import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";

import { Button } from "../../components/common/Button/Button";
import { CardList } from "../../components/common/CardList/CardList";
import { WeaponPresetCard } from "../../components/weapon/WeaponPresetCard/WeaponPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character-data";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { EditWeaponPreset } from "./EditWeaponPreset";
import { EditWeaponPresetGroupCommon } from "./EditWeaponPresetGroupCommon";

export interface EditWeaponPresetGroupProps {
  characterId: CharacterId;
  weaponDefinitionId: WeaponDefinitionId;
}

/** Edit weapon presets with the same weapon definition id and belonging to the character */
export function EditWeaponPresetGroup({
  characterId,
  weaponDefinitionId,
}: EditWeaponPresetGroupProps) {
  const weaponPresetRepo = db.get("weaponPresets");
  const { items } = useItemsBelongingToCharacter(weaponPresetRepo, characterId);

  const weaponPresets = items.filter(
    (weaponPreset) => weaponPreset.definition.id === weaponDefinitionId,
  );

  const [editingPresetProxy, setEditingPresetProxy] = useState<
    WeaponPreset | undefined
  >(undefined);

  return (
    !!weaponPresets.length && (
      <>
        <Box>
          <EditWeaponPresetGroupCommon
            characterId={characterId}
            weaponDefinitionId={weaponDefinitionId}
          />

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Presets
            </Typography>

            <Button
              onClick={() => {
                weaponPresetRepo.add(
                  new WeaponPreset(
                    characterId,
                    getWeaponDefinition(weaponDefinitionId),
                  ),
                );
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
                    weaponDefinition={weaponPreset.definition}
                    stars={weaponPreset.stars}
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
