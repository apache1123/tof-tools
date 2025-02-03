import { Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { BuffSummary } from "../../components/combat-simulator/BuffSummary/BuffSummary";
import { GearComparison } from "../../models/gear-compare/gear-comparison";
import { Team } from "../../models/team/team";
import { Weapon } from "../../models/weapon/weapon";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useSelectedCharacter } from "../character/useSelectedCharacter";

// TODO: Naming?
export function CompareGear() {
  const $state = useProxy(gearCompareState);

  const { characterDataProxy } = useSelectedCharacter();
  if (!characterDataProxy) return "No character";

  const characterPreset = $state.getCharacterPreset();

  if (!characterPreset) return "No selected preset";

  const { teamPreset, gearSetPreset, baseAttacks, critRateFlat } =
    characterPreset;

  if (!teamPreset) return "No team in preset";
  if (!gearSetPreset) return "No gear set in preset";

  const currentGear = $state.getCurrentGear();
  if (!currentGear) return "No current gear";

  const newGear = $state.getNewGear();
  if (!newGear) return "No new gear";

  const mainWeaponPreset = teamPreset.getMainWeaponPreset();

  let mainWeapon: Weapon | undefined;
  const team = new Team();

  teamPreset.getWeaponPresets().forEach((weaponPreset, i) => {
    if (i < Team.maxNumOfWeapons && weaponPreset) {
      const weapon = new Weapon(weaponPreset.definition);
      weapon.applyPreset(weaponPreset);

      team.setWeapon(i, weapon);

      if (weaponPreset === mainWeaponPreset) {
        mainWeapon = weapon;
      }
    }
  });

  if (!mainWeapon) return "No main weapon";

  const gearComparison = new GearComparison(
    characterDataProxy,
    baseAttacks,
    critRateFlat,
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
    <>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Current gear
            </Typography>
            <Stack spacing={2}>
              <Box>Value: {currentGearResult.gearValue}</Box>
              <Box>
                Damage:{" "}
                {currentGearResult.damageSummary.totalDamage.finalDamage}
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
      {currentGearResult.buffSummary && (
        <BuffSummary buffSummary={currentGearResult.buffSummary} />
      )}
    </>
  );
}
