import { Box, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { BuffSummary } from "../../components/combat-simulator/BuffSummary/BuffSummary";
import { NumericString } from "../../components/common/NumericString/NumericString";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
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
  characterPreset: CharacterPreset;
  teamPreset: TeamPreset;
  gearSet: GearSet;
  currentGear: Gear;
  newGear: Gear;
}

export function GearCompareResults({
  characterData,
  characterPreset,
  teamPreset,
  gearSet,
  currentGear,
  newGear,
}: GearCompareResultsProps) {
  const { baseAttacks, critRateFlat } = characterPreset;

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
        <SectionHeading>Results</SectionHeading>

        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <SectionSubheading>Current gear</SectionSubheading>
            <Stack spacing={2}>
              <Box>
                Value:{" "}
                <NumericString
                  value={currentGearResult.gearValue}
                  variant="percentage2dp"
                />
              </Box>
              <Box>
                Damage:{" "}
                <NumericString
                  value={
                    currentGearResult.damageSummary.totalDamage.finalDamage
                  }
                  variant="integer"
                />
              </Box>
              {currentGearResult.maxTitan && (
                <>
                  <Box>
                    Value if gear is max titan:{" "}
                    <NumericString
                      value={currentGearResult.maxTitan.gearValue}
                      variant="percentage2dp"
                    />
                  </Box>
                  <Box>
                    Damage if gear is max titan:{" "}
                    <NumericString
                      value={
                        currentGearResult.maxTitan.damageSummary.totalDamage
                          .finalDamage
                      }
                      variant="integer"
                    />
                  </Box>
                </>
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionSubheading>New gear</SectionSubheading>
            <Stack spacing={2}>
              <Box>
                Value:{" "}
                <NumericString
                  value={newGearResult.gearValue}
                  variant="percentage2dp"
                />
              </Box>
              <Box>
                Damage:{" "}
                <NumericString
                  value={newGearResult.damageSummary.totalDamage.finalDamage}
                  variant="integer"
                />
              </Box>
              {newGearResult.maxTitan && (
                <>
                  <Box>
                    Value if gear is max titan:{" "}
                    <NumericString
                      value={newGearResult.maxTitan.gearValue}
                      variant="percentage2dp"
                    />
                  </Box>
                  <Box>
                    Damage if gear is max titan:{" "}
                    <NumericString
                      value={
                        newGearResult.maxTitan.damageSummary.totalDamage
                          .finalDamage
                      }
                      variant="integer"
                    />
                  </Box>
                </>
              )}
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
