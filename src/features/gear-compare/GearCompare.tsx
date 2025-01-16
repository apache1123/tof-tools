import { Alert, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { CharacterPresetSelector } from "../../components/character-preset/CharacterPresetSelector/CharacterPresetSelector";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character/character-preset";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { GearEditor } from "../gear/GearEditor";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const { itemProxies: characterPresetProxies, items: characterPresets } =
    useItemsBelongingToCharacter(db.get("characterPresets"), characterId);

  const $state = useProxy(gearCompareState);
  const { characterPresetId, gearTypeId } = $state;

  const findById = (preset: CharacterPreset) => preset.id === characterPresetId;
  const characterPresetProxy = characterPresetProxies.find(findById);
  const characterPreset = characterPresets.find(findById);

  const gearProxy = gearTypeId
    ? characterPresetProxy?.gearSetPreset?.gearSet?.getSlot(gearTypeId).gear
    : undefined;

  return (
    <Stack sx={{ gap: 2 }}>
      <Card sx={{ p: 3 }}>
        <CharacterPresetSelector
          presets={characterPresets}
          selectedPreset={characterPreset}
          onSelect={(preset) => {
            $state.characterPresetId = preset.id;
          }}
        />
      </Card>

      {characterPreset && (
        <Card sx={{ p: 3 }}>
          <Stack sx={{ gap: 3 }}>
            <GearTypeToggle
              values={gearTypeId ? [gearTypeId] : []}
              exclusive
              enforceAtLeastOne
              onChange={(gearTypeIds) => {
                $state.gearTypeId = gearTypeIds[0];
              }}
            />

            {gearTypeId && (
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Current gear in preset
                  </Typography>

                  {gearProxy ? (
                    <Card elevation={1} sx={{ p: 2 }}>
                      <GearEditor gearProxy={gearProxy} />
                    </Card>
                  ) : (
                    <Alert severity="info">No gear in preset</Alert>
                  )}
                </Grid>
              </Grid>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
