import { Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { GearComparison } from "../../models/gear-compare/gear-comparison";
import { Team } from "../../models/team/team";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useSelectedCharacter } from "../character/useSelectedCharacter";

// TODO: Naming?
export function CompareGear() {
  const $state = useProxy(gearCompareState);

  const { characterDataProxy } = useSelectedCharacter();
  if (!characterDataProxy) return "No character";

  const characterPreset = $state.getCharacterPreset();

  if (!characterPreset) return "No selected preset";

  const { teamPreset, gearSetPreset } = characterPreset;

  if (!teamPreset) return "No team in preset";
  if (!gearSetPreset) return "No gear set in preset";

  const mainWeapon = teamPreset.getMainWeaponPreset()?.weapon;

  if (!mainWeapon) return "No main weapon in preset";

  const currentGear = $state.getCurrentGear();
  if (!currentGear) return "No current gear";

  const newGear = $state.getNewGear();
  if (!newGear) return "No new gear";

  const team = new Team();
  team.applyPreset(teamPreset);
  const gearComparison = new GearComparison(
    characterDataProxy,
    team,
    mainWeapon,
    undefined,
    gearSetPreset.gearSet,
    currentGear,
    newGear,
  );

  const currentGearResult = gearComparison.getCurrentGearResult();
  const newGearResult = gearComparison.getNewGearResult();

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Current gear
          </Typography>
          <Stack spacing={2}>
            <Box>Value: {currentGearResult.gearValue}</Box>
            <Box>
              Damage: {currentGearResult.damageSummary.totalDamage.finalDamage}
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            New gear
          </Typography>
          <Stack spacing={2}>
            <Box>Value: {newGearResult.gearValue}</Box>
            <Box>
              Damage: {newGearResult.damageSummary.totalDamage.finalDamage}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
