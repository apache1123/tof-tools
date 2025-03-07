import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { NumericCompareString } from "../../components/common/NumericCompareString/NumericCompareString";
import { NumericString } from "../../components/common/NumericString/NumericString";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import { WeaponIconWithElements } from "../../components/weapon/WeaponIconWithElements/WeaponIconWithElements";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import type { Gear } from "../../models/gear/gear";
import type { GearSet } from "../../models/gear/gear-set";
import { GearComparison } from "../../models/gear-compare/gear-comparison";
import { Team } from "../../models/team/team";
import type { TeamPreset } from "../../models/team/team-preset";
import { Weapon } from "../../models/weapon/weapon";
import { DamageBreakdowns } from "./DamageBreakdowns";

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

        <Box sx={{ mb: 5 }}>
          <Typography>Comparing using main weapon:</Typography>
          <WeaponIconWithElements definition={mainWeapon.definition} />
        </Box>

        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <SectionSubheading>Current gear</SectionSubheading>

            <Stack spacing={1}>
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
            </Stack>

            {currentGearResult.maxTitan && (
              <>
                <SectionSubheading sx={{ mt: 3 }}>
                  Current gear when at max titan
                </SectionSubheading>

                <Stack spacing={1}>
                  <Box>
                    Value:{" "}
                    <NumericString
                      value={currentGearResult.maxTitan.gearValue}
                      variant="percentage2dp"
                    />
                  </Box>
                  <Box>
                    Damage:{" "}
                    <NumericString
                      value={
                        currentGearResult.maxTitan.damageSummary.totalDamage
                          .finalDamage
                      }
                      variant="integer"
                    />
                  </Box>
                </Stack>
              </>
            )}
          </Grid>

          <Grid xs={12} md={6}>
            <SectionSubheading>New gear</SectionSubheading>

            <Stack spacing={1}>
              <Box>
                Value:{" "}
                <NumericCompareString
                  value={newGearResult.gearValue}
                  otherValue={currentGearResult.gearValue}
                  variant="percentage2dp"
                />
              </Box>
              <Box>
                Damage:{" "}
                <NumericCompareString
                  value={newGearResult.damageSummary.totalDamage.finalDamage}
                  otherValue={
                    currentGearResult.damageSummary.totalDamage.finalDamage
                  }
                  variant="integer"
                />
              </Box>
            </Stack>

            {newGearResult.maxTitan && (
              <>
                <SectionSubheading sx={{ mt: 3 }}>
                  New gear when at max titan
                </SectionSubheading>

                <Stack spacing={1}>
                  <Box>
                    Value:{" "}
                    {currentGearResult.maxTitan ? (
                      <NumericCompareString
                        value={newGearResult.maxTitan.gearValue}
                        otherValue={currentGearResult.maxTitan.gearValue}
                        variant="percentage2dp"
                      />
                    ) : (
                      <NumericString
                        value={newGearResult.maxTitan.gearValue}
                        variant="percentage2dp"
                      />
                    )}
                  </Box>
                  <Box>
                    Damage:{" "}
                    {currentGearResult.maxTitan ? (
                      <NumericCompareString
                        value={
                          newGearResult.maxTitan.damageSummary.totalDamage
                            .finalDamage
                        }
                        otherValue={
                          currentGearResult.maxTitan.damageSummary.totalDamage
                            .finalDamage
                        }
                        variant="integer"
                      />
                    ) : (
                      <NumericString
                        value={
                          newGearResult.maxTitan.damageSummary.totalDamage
                            .finalDamage
                        }
                        variant="integer"
                      />
                    )}
                  </Box>
                </Stack>
              </>
            )}
          </Grid>
        </Grid>

        <Accordion elevation={1} sx={{ mt: 3 }}>
          <AccordionSummary>
            What do these numbers mean and how are they calculated?
          </AccordionSummary>
          <AccordionDetails>
            <Stack sx={{ gap: 2 }}>
              <Typography>
                <b>Value:</b> is the damage increase you get from the piece of
                gear, compared to without it. (This only accounts for the
                gear&apos;s random stats and augmentation stats, and not the
                gear&apos;s base stats)
              </Typography>

              <Typography>
                <b>Damage:</b> is the simulated damage with the gear (with a
                dummy skill attack, see below). See the damage breakdown section
                how this is calculated, and with what buffs.
              </Typography>

              <Typography>
                <b>&quot;When at max titan&ldquo;:</b> is the theoretical values
                if that piece of gear is augmented to max titan stat values
                (Check the max titan preview of the gear)
              </Typography>

              <Typography>
                The damage is simulated by using a single dummy skill attack
                with the main weapon (with a skill attack multiplier of 100%,
                e.g. in-game text it would be{" "}
                <i>Deal damage equal to 100% of ATK plus 0</i>). The attack is
                then buffed with all possible buffs from the weapons, matrices,
                gear etc. (As long as they are valid to be activated some time
                during combat. e.g. Frost resonance will not be applied if the
                team doesn&apos;t have at least two frost weapons, but
                Fiona&apos;s buff on discharge will be applied, because it may
                be activated during combat)
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <DamageBreakdowns
        items={[
          ...(currentGearResult.damageBreakdown
            ? [
                {
                  label: "Current gear",
                  damageBreakdown: currentGearResult.damageBreakdown,
                  finalDamage:
                    currentGearResult.damageSummary.totalDamage.finalDamage,
                },
              ]
            : []),
          ...(newGearResult.damageBreakdown
            ? [
                {
                  label: "New gear",
                  damageBreakdown: newGearResult.damageBreakdown,
                  finalDamage:
                    newGearResult.damageSummary.totalDamage.finalDamage,
                },
              ]
            : []),
          ...(currentGearResult.maxTitan?.damageBreakdown
            ? [
                {
                  label: "Current gear max titan",
                  damageBreakdown: currentGearResult.maxTitan.damageBreakdown,
                  finalDamage:
                    currentGearResult.maxTitan.damageSummary.totalDamage
                      .finalDamage,
                },
              ]
            : []),
          ...(newGearResult.maxTitan?.damageBreakdown
            ? [
                {
                  label: "New gear max titan",
                  damageBreakdown: newGearResult.maxTitan.damageBreakdown,
                  finalDamage:
                    newGearResult.maxTitan.damageSummary.totalDamage
                      .finalDamage,
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
