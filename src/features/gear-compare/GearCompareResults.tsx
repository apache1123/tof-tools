import { Box, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { BuffSummary } from "../../components/combat-simulator/BuffSummary/BuffSummary";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character/character-preset";
import type { Gear } from "../../models/gear/gear";
import type { GearSet } from "../../models/gear/gear-set";
import { GearComparison } from "../../models/gear-compare/gear-comparison";
import { Team } from "../../models/team/team";
import type { TeamPreset } from "../../models/team/team-preset";
import { Weapon } from "../../models/weapon/weapon";

export interface GearCompareResultsProps {
  characterData: CharacterData;
  characterPresetProxy: CharacterPreset;
  teamPresetProxy: TeamPreset;
  gearSetProxy: GearSet;
  currentGearProxy: Gear;
  newGearProxy: Gear;
}

export function GearCompareResults({
  characterData,
  characterPresetProxy,
  teamPresetProxy,
  gearSetProxy,
  currentGearProxy,
  newGearProxy,
}: GearCompareResultsProps) {
  const { baseAttacks, critRateFlat } = useSnapshot(
    characterPresetProxy,
  ) as CharacterPreset;
  const teamPreset = useSnapshot(teamPresetProxy);
  const gearSet = useSnapshot(gearSetProxy) as GearSet;
  const currentGear = useSnapshot(currentGearProxy) as Gear;
  const newGear = useSnapshot(newGearProxy) as Gear;

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
    characterData,
    baseAttacks,
    critRateFlat,
    team,
    mainWeapon,
    undefined,
    gearSet,
    currentGear,
    newGear,
  );

  const currentGearResult = gearComparison.getCurrentGearResult();
  const newGearResult = gearComparison.getNewGearResult();

  return (
    <>
      <Paper sx={{ p: 3 }}>
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
      </Paper>
      {currentGearResult.buffSummary && (
        <BuffSummary buffSummary={currentGearResult.buffSummary} />
      )}
    </>
  );
}
