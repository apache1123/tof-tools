import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip } from '@mui/material';
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
        <Tooltip title="(optional) The tool does its best to determine the number of stars based on the stats, but sometimes you'll have to fill this in manually.">
          <InfoOutlinedIcon sx={{ ml: 1 }} />
        </Tooltip>
      )}
    </Box>
  );
}
