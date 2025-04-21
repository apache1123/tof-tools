import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { CharacterLevelInput } from "../../../components/character/CharacterLevelInput/CharacterLevelInput";
import { NumericString } from "../../../components/common/NumericString/NumericString";
import { ErrorText } from "../../../components/common/Text/ErrorText";
import { InfoText } from "../../../components/common/Text/InfoText";
import { ElementalStyledText } from "../../../components/elemental/ElementalStyledText/ElementalStyledText";
import { WeaponIconWithElements } from "../../../components/weapon/WeaponIconWithElements/WeaponIconWithElements";
import type { CharacterData } from "../../../models/character/character-data";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { EditCharacterPresetCustomBuffs } from "./EditCharacterPresetCustomBuffs";
import { EditCharacterPresetOverrideStats } from "./EditCharacterPresetOverrideStats";
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
          <>
            <InfoText sx={{ mb: 2 }}>
              Fill in these values according to what is on the Wanderer screen
              in-game when you have the above team and gear equipped. The
              element is based on the main weapon of the team.
            </InfoText>

            <Box sx={{ mb: 5 }}>
              <Typography>Using main weapon:</Typography>
              <WeaponIconWithElements definition={mainWeaponDefinition} />
            </Box>

            <Grid container spacing={2}>
              <EditCharacterPresetOverrideStats
                characterPresetProxy={characterPresetProxy}
              />

              <Grid xs={12} sm={6} md={4} lg={3}>
                <CharacterLevelInput
                  value={level}
                  onChange={(value) => {
                    characterDataProxy.level = value;
                  }}
                />
              </Grid>
            </Grid>

            <EditCharacterPresetCustomBuffs
              characterPresetProxy={characterPresetProxy}
              sx={{ mt: 4 }}
            />
          </>
        )
      }
      expand={expand}
    />
  );
}
