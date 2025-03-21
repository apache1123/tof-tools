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

import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import { NumericCompareString } from "../../components/common/NumericCompareString/NumericCompareString";
import { NumericString } from "../../components/common/NumericString/NumericString";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import { WeaponIconWithElements } from "../../components/weapon/WeaponIconWithElements/WeaponIconWithElements";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import type { Gear } from "../../models/gear/gear";
import { GearDamageSimulator } from "../../models/gear-compare/gear-damage-simulator";
import { createTeamFromPreset } from "../../models/team/create-team-from-preset";
import { DamageBreakdowns } from "./DamageBreakdowns";
import { SwapCurrentAndNewGear } from "./SwapCurrentAndNewGear";

export interface GearCompareResultsProps {
  characterData: CharacterData;
  characterPreset: CharacterPreset;
  currentGear: Gear;
  newGear: Gear;
}

export function GearCompareResults({
  characterData,
  characterPreset,
  currentGear,
  newGear,
}: GearCompareResultsProps) {
  const {
    teamPreset,
    gearSetPreset,
    baseAttacks,
    critRateFlat,
    simulacrumTrait,
  } = characterPreset;

  if (!teamPreset) return <ErrorText>No team</ErrorText>;
  if (!gearSetPreset) return <ErrorText>No gear preset</ErrorText>;

  const { team, mainWeapon } = createTeamFromPreset(teamPreset);

  if (!mainWeapon) return <ErrorText>No main weapon</ErrorText>;

  const gearDamageSimulator = new GearDamageSimulator(
    characterData,
    baseAttacks,
    critRateFlat,
    team,
    mainWeapon,
    simulacrumTrait,
    gearSetPreset.gearSet,
  );

  const currentGearResult = gearDamageSimulator.getCurrentGearResult(
    currentGear.type.id,
  );
  const newGearResult = gearDamageSimulator.getNewGearResult(newGear);

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
                Damage increase:{" "}
                <NumericString
                  value={currentGearResult.damageIncrease}
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
                    Damage increase:{" "}
                    <NumericString
                      value={currentGearResult.maxTitan.damageIncrease}
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
            <Stack direction="row" sx={{ gap: 1, alignItems: "start" }}>
              <SectionSubheading>New gear</SectionSubheading>
              <SwapCurrentAndNewGear />
            </Stack>

            <Stack spacing={1}>
              <Box>
                Damage increase:{" "}
                <NumericCompareString
                  value={newGearResult.damageIncrease}
                  otherValue={currentGearResult.damageIncrease}
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
                    Damage increase:{" "}
                    {currentGearResult.maxTitan ? (
                      <NumericCompareString
                        value={newGearResult.maxTitan.damageIncrease}
                        otherValue={currentGearResult.maxTitan.damageIncrease}
                        variant="percentage2dp"
                      />
                    ) : (
                      <NumericString
                        value={newGearResult.maxTitan.damageIncrease}
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
                <b>Damage increase:</b> is the increase in damage you get from
                the piece of gear, compared to without that piece of gear. (This
                only accounts for the gear&apos;s random stats and augmentation
                stats, not the gear&apos;s base stats)
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
