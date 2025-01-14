import { Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { BaseAttackInput } from "../../components/character/BaseAttackInput/BaseAttackInput";
import { CritRateFlatInput } from "../../components/character/CritRateFlatInput/CritRateFlatInput";
import { ElementalStyledText } from "../../components/elemental/ElementalStyledText/ElementalStyledText";
import { WeaponIcon } from "../../components/weapon/WeaponIcon/WeaponIcon";
import type { CharacterPreset } from "../../models/character/character-preset";

export interface CharacterPresetStatsEditorProps {
  characterPresetProxy: CharacterPreset;
}

export function CharacterPresetStatsEditor({
  characterPresetProxy,
}: CharacterPresetStatsEditorProps) {
  const { teamPreset, baseAttacks, critRateFlat } =
    useSnapshot(characterPresetProxy);
  const mainWeapon = teamPreset?.getMainWeaponPreset()?.weapon;

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h6">Preset stats</Typography>

      {mainWeapon ? (
        <>
          <Box>
            <Typography>Main weapon</Typography>
            <WeaponIcon
              weaponName={mainWeapon.definitionId}
              elementalIcon={mainWeapon.elementalIcon}
            />
            <Stack direction="row" sx={{ gap: 0.5 }}>
              {mainWeapon.gearCalculationElements.map((element) => (
                <ElementalStyledText key={element} elementalType={element}>
                  {element}
                </ElementalStyledText>
              ))}
            </Stack>
          </Box>

          <Grid container spacing={2}>
            {mainWeapon.gearCalculationElements.map((element) => (
              <Grid key={element} xs={12} sm={6} md={4} lg={3}>
                <BaseAttackInput
                  element={element}
                  value={baseAttacks.get(element)}
                  onChange={(value) => {
                    characterPresetProxy.baseAttacks.set(element, value);
                  }}
                />
              </Grid>
            ))}

            <Grid xs={12} sm={6} md={4} lg={3}>
              <CritRateFlatInput
                value={critRateFlat}
                onChange={(value) => {
                  characterPresetProxy.critRateFlat = value;
                }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>No main weapon</Typography>
      )}
    </Card>
  );
}
