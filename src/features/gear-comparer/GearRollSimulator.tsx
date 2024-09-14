import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import { GearStarsSelector } from '../../components/GearStarsSelector/GearStarsSelector';
import { NumericStringPercentage2dp } from '../../components/NumericString/NumericString';
import { maxNumOfRandomStatRolls } from '../../definitions/gear';
import type { Gear } from '../../models/gear';
import type { GearRandomStatRollCombinations } from '../../models/gear-random-stat-roll-combinations';
import type { RandomStat } from '../../models/random-stat';
import { gearComparerState, rollSimulatorState } from '../../states/states';
import { getComparisonColor } from '../../utils/color-utils';
import { sum } from '../../utils/math-utils';
import { GearRollSimulatorStat } from './GearRollSimulatorStat';

export function GearRollSimulator() {
  const { replacementGear } = useSnapshot(gearComparerState);
  const { gear: gearState } = rollSimulatorState;
  const { gear: gearSnap } = useSnapshot(rollSimulatorState);

  useEffect(() => {
    reset();
  }, [replacementGear]);

  return (
    <Accordion elevation={3}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="roll-simulator-panel-content"
        id="roll-simulator-panel-header"
      >
        <Typography>Roll simulator</Typography>
      </AccordionSummary>
      <AccordionDetails data-testid="roll-simulator-panel-content">
        {gearSnap && gearState && (
          <AccordionContent
            gearState={gearState}
            GearB={replacementGear as Gear}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function AccordionContent({
  gearState,
  GearB,
}: {
  gearState: Gear;
  GearB: Gear;
}) {
  const gearSnap = useSnapshot(gearState);

  const randomStatRollCombinations = (
    GearB as Gear
  ).getRandomStatRollCombinations();

  const canDetermineStars =
    !!gearSnap.stars || (gearSnap as Gear).getPossibleStars().length <= 1;

  return (
    <Box>
      <Typography gutterBottom>
        Simulate rolls for a new piece of gear that is not at 5 stars yet to see
        if it has a chance of being better than the current gear
      </Typography>
      <Box mt={5}>
        {!canDetermineStars && (
          <UnableToDetermineStars
            gearState={gearState}
            randomStatRollCombinations={randomStatRollCombinations}
          />
        )}
        {canDetermineStars && (
          <DeterminedStars
            gearState={gearState}
            randomStatRollCombinations={randomStatRollCombinations}
          />
        )}
      </Box>
    </Box>
  );
}

function UnableToDetermineStars({
  gearState,
  randomStatRollCombinations,
}: {
  gearState: Gear;
  randomStatRollCombinations: GearRandomStatRollCombinations[];
}) {
  const gearSnap = useSnapshot(gearState);

  const possibleStars = Object.keys(
    Object.groupBy(randomStatRollCombinations, x => x.stars)
  );

  return (
    <Box>
      <Typography color="info.main" gutterBottom>
        Can&apos;t determine the number of stars{' '}
        <strong>(either {possibleStars.join(' or ')} stars)</strong>. Select it
        below to continue
      </Typography>
      <GearStarsSelector
        stars={gearSnap.stars}
        onStarsChange={(stars) => {
          gearState.stars = stars;
        }}
      />
    </Box>
  );
}

function DeterminedStars({
  gearState,
  randomStatRollCombinations,
}: {
  gearState: Gear;
  randomStatRollCombinations: GearRandomStatRollCombinations[];
}) {
  const gearSnap = useSnapshot(gearState);
  const { rolls, gearValue } = useSnapshot(rollSimulatorState);
  const { selectedLoadoutGearValue } = useSnapshot(gearComparerState);

  const startingRolls =
    gearSnap.stars || (randomStatRollCombinations[0]?.stars ?? 0);
  const totalRolls = startingRolls + sum(...rolls).toNumber();

  const matchingRandomStatRollCombinations = randomStatRollCombinations.find(
    (x) => x.stars === startingRolls
  );

  const canRoll = totalRolls < maxNumOfRandomStatRolls;

  return (
    <Box>
      <Box mb={2}>
        <GearStarsSelector stars={totalRolls} />
      </Box>
      <Stack spacing={2} mb={5}>
        {gearSnap.randomStats.map((statSnap, i) => {
          const statState = gearState.randomStats[i];
          if (!statSnap || !statState) {
            return null;
          }

          const statTotalRolls =
            rolls[i] +
            (matchingRandomStatRollCombinations
              ? matchingRandomStatRollCombinations.randomStatRollCombinations[i]
                  .rollCombination.numberOfRolls
              : 0);

          return (
            <GearRollSimulatorStat
              key={i}
              statSnap={statSnap as RandomStat}
              statState={statState}
              rolls={statTotalRolls}
              canRoll={canRoll}
              onAddRoll={() => rollSimulatorState.addRoll(i)}
            />
          );
        })}
      </Stack>
      <Box>
        <Typography>Value: </Typography>
        <Typography
          color={getComparisonColor(gearValue > selectedLoadoutGearValue)}
          fontSize="1.5rem"
        >
          <NumericStringPercentage2dp value={gearValue} />
        </Typography>
      </Box>
      <Box textAlign="left" mt={3}>
        <Button
          onClick={() => {
            reset();
          }}
          variant="outlined"
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

function reset() {
  rollSimulatorState.copyFromReplacementGear();
  rollSimulatorState.resetRolls();
}
