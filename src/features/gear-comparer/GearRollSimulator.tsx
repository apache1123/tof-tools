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
import groupBy from 'lodash.groupby';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import { GearStarsSelector } from '../../components/GearStarsSelector/GearStarsSelector';
import { maxNumOfRandomStatRolls } from '../../constants/gear';
import type { Gear } from '../../models/gear';
import {
  getGearRandomStatRollCombinations,
  getPossibleStars,
  setStars,
} from '../../models/gear';
import type { GearRandomStatRollCombinations } from '../../models/gear-random-stat-roll-combinations';
import { getComparisonColor } from '../../utils/color-utils';
import { additiveSum } from '../../utils/math-utils';
import { toPercentageString2dp } from '../../utils/number-utils';
import { GearRollSimulatorStat } from './GearRollSimulatorStat';
import { gearValuesStore } from './stores/derived/gear-values';
import { rollSimulatorGearValueStore } from './stores/derived/roll-simulator-gear-value';
import { gearComparerGearsStore } from './stores/gear-comparer-gear';
import {
  addRoll,
  copyFromGearB,
  resetRolls,
  rollSimulatorStore,
} from './stores/roll-simulator';

export function GearRollSimulator() {
  const { GearB } = useSnapshot(gearComparerGearsStore);
  const { gear } = rollSimulatorStore;
  const { gear: gearSnap } = useSnapshot(rollSimulatorStore);

  useEffect(() => {
    reset();
  }, [GearB]);

  if (!GearB) {
    return null;
  }

  return (
    <Accordion elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="roll-simulator-panel-content"
        id="roll-simulator-panel-header"
      >
        <Typography>Roll simulator</Typography>
      </AccordionSummary>
      <AccordionDetails data-testid="roll-simulator-panel-content">
        {gearSnap && gear && (
          <AccordionContent gear={gear} GearB={GearB as Gear} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function AccordionContent({ gear, GearB }: { gear: Gear; GearB: Gear }) {
  const gearSnap = useSnapshot(gear);

  const randomStatRollCombinations = getGearRandomStatRollCombinations(
    GearB as Gear
  );

  const canDetermineStars =
    !!gearSnap.stars || getPossibleStars(gearSnap as Gear).length <= 1;

  return (
    <Box>
      <Typography gutterBottom>
        Simulate rolls for a new piece of gear that is not at 5 stars yet to see
        if it has a chance of being better than the current gear
      </Typography>
      <Box mt={5}>
        {!canDetermineStars && (
          <UnableToDetermineStars
            gear={gear}
            randomStatRollCombinations={randomStatRollCombinations}
          />
        )}
        {canDetermineStars && (
          <DeterminedStars
            gear={gear}
            randomStatRollCombinations={randomStatRollCombinations}
          />
        )}
      </Box>
    </Box>
  );
}

function UnableToDetermineStars({
  gear,
  randomStatRollCombinations,
}: {
  gear: Gear;
  randomStatRollCombinations: GearRandomStatRollCombinations[];
}) {
  const gearSnap = useSnapshot(gear);

  const possibleStars = Object.keys(
    groupBy(randomStatRollCombinations, 'stars')
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
        onStarsChange={(stars) => setStars(gear, stars)}
      />
    </Box>
  );
}

function DeterminedStars({
  gear,
  randomStatRollCombinations,
}: {
  gear: Gear;
  randomStatRollCombinations: GearRandomStatRollCombinations[];
}) {
  const gearSnap = useSnapshot(gear);
  const { rolls } = useSnapshot(rollSimulatorStore);
  const { value } = useSnapshot(rollSimulatorGearValueStore);
  const { GearAValue } = useSnapshot(gearValuesStore);

  const startingRolls =
    gearSnap.stars || (randomStatRollCombinations[0]?.stars ?? 0);
  const totalRolls = startingRolls + additiveSum(rolls as number[]).toNumber();

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
          const stat = gear.randomStats[i];
          if (!statSnap || !stat) {
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
              stat={stat}
              rolls={statTotalRolls}
              canRoll={canRoll}
              onAddRoll={() => addRoll(i)}
            />
          );
        })}
      </Stack>
      <Box>
        <Typography>Value: </Typography>
        <Typography
          color={getComparisonColor(value > GearAValue)}
          fontSize="1.5rem"
        >
          {toPercentageString2dp(value)}
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
  copyFromGearB();
  resetRolls();
}
