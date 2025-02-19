import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { CharacterLevelInput } from "../../../components/character/CharacterLevelInput/CharacterLevelInput";
import { BaseAttackInput } from "../../../components/character-preset/BaseAttackInput/BaseAttackInput";
import { CritRateFlatInput } from "../../../components/character-preset/CritRateFlatInput/CritRateFlatInput";
import { ErrorText } from "../../../components/common/ErrorText/ErrorText";
import { NumericString } from "../../../components/common/NumericString/NumericString";
import { ElementalStyledText } from "../../../components/elemental/ElementalStyledText/ElementalStyledText";
import { WeaponIcon } from "../../../components/weapon/WeaponIcon/WeaponIcon";
import type { CharacterData } from "../../../models/character/character-data";
import type { CharacterPreset } from "../../../models/character/character-preset";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";

export interface EditCharacterPresetStatsProps {
  characterPresetProxy: CharacterPreset;
  characterDataProxy: CharacterData;
  expand?: boolean;
}

export function EditCharacterPresetStats({
  characterPresetProxy,
  characterDataProxy,
  expand,
}: EditCharacterPresetStatsProps) {
  const { teamPreset, baseAttacks, critRateFlat } =
    useSnapshot(characterPresetProxy);
  const { level } = useSnapshot(characterDataProxy);

  const mainWeaponDefinition = teamPreset?.getMainWeaponPreset()?.definition;

  const areAllStatsSet =
    !!mainWeaponDefinition?.gearResonanceElements.every(
      (element) => baseAttacks.get(element) > 0,
    ) && critRateFlat > 0;

  return (
    <EditCharacterPresetSection
      title="Preset stats"
      summary={
        teamPreset ? (
          mainWeaponDefinition ? (
            areAllStatsSet ? (
              <Stack direction="row" sx={{ gap: 2 }}>
                {mainWeaponDefinition.gearResonanceElements.map((element) => (
                  <ElementalStyledText key={element} elementalType={element}>
                    {element}:{" "}
                    <NumericString
                      value={baseAttacks.get(element)}
                      variant="integer"
                    />
                  </ElementalStyledText>
                ))}

                <Typography>
                  Crit: <NumericString value={critRateFlat} variant="integer" />
                </Typography>

                <Typography>
                  Wanderer level:{" "}
                  <NumericString value={level} variant="integer" />
                </Typography>
              </Stack>
            ) : (
              <ErrorText sx={{ py: 0 }}>Stats not set</ErrorText>
            )
          ) : (
            <ErrorText sx={{ py: 0 }}>Team has no weapons</ErrorText>
          )
        ) : (
          <ErrorText sx={{ py: 0 }}>No team selected</ErrorText>
        )
      }
      details={
        mainWeaponDefinition && (
          <Stack sx={{ gap: 3 }}>
            <Box>
              <Typography>Using main weapon</Typography>
              <WeaponIcon
                weaponId={mainWeaponDefinition.id}
                iconWeaponId={mainWeaponDefinition.iconWeaponId}
                elementalIcon={mainWeaponDefinition.elementalIcon}
              />
              <Stack direction="row" sx={{ gap: 0.5 }}>
                {mainWeaponDefinition.gearResonanceElements.map((element) => (
                  <ElementalStyledText key={element} elementalType={element}>
                    {element}
                  </ElementalStyledText>
                ))}
              </Stack>
            </Box>

            <Grid container spacing={2}>
              {mainWeaponDefinition.gearResonanceElements.map((element) => (
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

              <Grid xs={12} sm={6} md={4} lg={3}>
                <CharacterLevelInput
                  value={level}
                  onChange={(value) => {
                    characterDataProxy.level = value;
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        )
      }
      expand={expand}
    />
  );
}
