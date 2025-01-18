import { Alert, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { CharacterPresetSelector } from "../../components/character-preset/CharacterPresetSelector/CharacterPresetSelector";
import { Button } from "../../components/common/Button/Button";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character/character-preset";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { AddNewGear } from "../gear/AddNewGear";
import { GearEditor } from "../gear/GearEditor";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const $state = useProxy(gearCompareState);
  const { characterPresetId, gearTypeId, newGearId } = $state;

  const { itemProxies: characterPresetProxies, items: characterPresets } =
    useItemsBelongingToCharacter(db.get("characterPresets"), characterId);

  const findById = (preset: CharacterPreset) => preset.id === characterPresetId;
  const characterPresetProxy = characterPresetProxies.find(findById);
  const characterPreset = characterPresets.find(findById);

  const { itemProxies: gearProxies } = useItemsBelongingToCharacter(
    db.get("gears"),
    characterId,
  );
  const newGearProxy = gearProxies.find(
    (gearProxy) => gearProxy.id === newGearId,
  );

  const currentGearProxy = gearTypeId
    ? characterPresetProxy?.gearSetPreset?.gearSet?.getSlot(gearTypeId).gear
    : undefined;

  const clearNewGear = () => {
    $state.newGearId = undefined;
  };

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
                clearNewGear();
              }}
            />

            {gearTypeId && (
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Current gear in preset
                  </Typography>

                  {currentGearProxy ? (
                    <Card elevation={1} sx={{ p: 2 }}>
                      <GearEditor gearProxy={currentGearProxy} />
                    </Card>
                  ) : (
                    <Alert severity="info">No gear in preset</Alert>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{ mb: 2, gap: 1, alignItems: "center" }}
                  >
                    <Typography variant="h5">New gear</Typography>
                    {newGearProxy && (
                      <Button
                        onClick={() => {
                          clearNewGear();
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </Stack>

                  {newGearProxy ? (
                    <Card elevation={1} sx={{ p: 2 }}>
                      <GearEditor gearProxy={newGearProxy} />
                    </Card>
                  ) : (
                    <Stack
                      direction="row"
                      sx={{ gap: 1, alignItems: "center" }}
                    >
                      <AddNewGear
                        characterId={characterId}
                        enforceGearType={gearTypeId}
                        buttonProps={{ variant: "outlined" }}
                        onConfirm={(gearProxy) => {
                          $state.newGearId = gearProxy.id;
                        }}
                      />
                      <Typography>or</Typography>
                      <Button>Choose from existing</Button>
                    </Stack>
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
