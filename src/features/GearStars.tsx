import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip } from '@mui/material';
import groupBy from 'lodash.groupby';
import { useSnapshot } from 'valtio';

import { GearStarsSelector } from '../components/GearStarsSelector/GearStarsSelector';
import type { Gear } from '../models/gear';
import { getGearRandomStatRollCombinations, setStars } from '../models/gear';

export interface GearStarsProps {
  gear: Gear;
}

export function GearStars({ gear }: GearStarsProps) {
  const gearSnap = useSnapshot(gear);

  const randomStatRollCombinations = getGearRandomStatRollCombinations(
    gearSnap as Gear
  );

  const possibleStars = Object.keys(
    groupBy(randomStatRollCombinations, 'stars')
  );

  return (
    <Box>
      <GearStarsSelector
        stars={
          gearSnap.stars ||
          (randomStatRollCombinations.length === 1
            ? randomStatRollCombinations[0].stars
            : 0)
        }
        onStarsChange={(stars) => setStars(gear, stars)}
      />
      {gearSnap.stars === 0 && randomStatRollCombinations.length > 1 && (
        <Tooltip
          title={
            <>
              Can&apos;t automatically determine the number of stars{' '}
              <strong>(either {possibleStars.join(' or ')} stars)</strong>.
              Please select it manually.
            </>
          }
        >
          <InfoOutlinedIcon color="info" sx={{ ml: 1 }} />
        </Tooltip>
      )}
    </Box>
  );
}
