import { Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { BaseAttackInput } from "../../components/character-preset/BaseAttackInput/BaseAttackInput";
import { CritRateFlatInput } from "../../components/character-preset/CritRateFlatInput/CritRateFlatInput";
import { ElementalStyledText } from "../../components/elemental/ElementalStyledText/ElementalStyledText";
import { WeaponIcon } from "../../components/weapon/WeaponIcon/WeaponIcon";
import type { CharacterPreset } from "../../models/character/character-preset";

export interface EditCharacterPresetStatsProps {
  characterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetStats({
  characterPresetProxy,
}: EditCharacterPresetStatsProps) {
  const { teamPreset, baseAttacks, critRateFlat } =
    useSnapshot(characterPresetProxy);
  const mainWeapon = teamPreset?.getMainWeaponPreset()?.weapon;

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Preset stats
      </Typography>

      {mainWeapon ? (
        <Stack sx={{ gap: 3 }}>
          <Box>
            <Typography>Using main weapon</Typography>
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
        </Stack>
      ) : (
        <Typography>No main weapon</Typography>
      )}
    </Card>
  );
}
