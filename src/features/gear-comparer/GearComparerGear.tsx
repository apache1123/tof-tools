import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { Gear } from '../../models/gear';
import type { GearType } from '../../models/gear-type';
import { EmptyGearPiece, GearPiece } from '../GearPiece';
import { TitanGearMaxStats } from '../TitanGearMaxStats';
import { GearRollSimulator } from './GearRollSimulator';
import { gearComparerGearMaxTitansState } from './states/derived/gear-comparer-gear-max-titans';
import type { GearComparerGearPosition } from './states/gear-comparer-gear';
import { gearComparerGearsState } from './states/gear-comparer-gear';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export interface GearComparerGearProps {
  position: GearComparerGearPosition;
}

export function GearComparerGear({ position }: GearComparerGearProps) {
  const { [position]: gearState } = gearComparerGearsState;
  const { [position]: gearSnap } = useSnapshot(gearComparerGearsState);
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
  const maxTitansSnap = useSnapshot(gearComparerGearMaxTitansState);

  const handleGearTypeSelect = (gearType: GearType) => {
    const gear = new Gear(gearType);
    gearComparerGearsState[position] = gear;
  };

  const handleNewGear = (gear: Gear) => {
    gearComparerGearsState[position] = gear;
  };

  return gearSnap && gearState ? (
    <GearPiece
      gearSnap={gearSnap as Gear}
      gearState={gearState}
      showGearOCRButton
      showSaveGearButton
      showStatSummary={selectedElementalType}
      maxTitanStatsContent={
        gearSnap.stars !== 5 &&
        (gearSnap as Gear).getPossibleStars().length > 1 ? (
          <Typography color="info.main" gutterBottom>
            Can&apos;t determine the number of stars{' '}
            <strong>
              (either {(gearSnap as Gear).getPossibleStars().join(' or ')}{' '}
              stars)
            </strong>
            . Select it above to continue
          </Typography>
        ) : gearSnap.stars !== 5 &&
          (gearSnap as Gear).getPossibleStars().length === 1 &&
          (gearSnap as Gear).getPossibleStars()[0] !== 5 ? (
          <Typography color="info.main" gutterBottom>
            Can&apos;t calculate max titan stat values if gear is not at 5 star
          </Typography>
        ) : gearSnap && maxTitansSnap.titansByReferenceGearId[gearSnap.id] ? (
          <TitanGearMaxStats
            maxTitanGearSnap={
              maxTitansSnap.titansByReferenceGearId[gearSnap.id] as Gear
            }
            elementalType={selectedElementalType}
          />
        ) : (
          <Box>
            <Typography color="info.main">
              Can&apos;t calculate max titan stat values if gear is not at 5
              star.
            </Typography>
            <Typography color="info.main" mt={2} gutterBottom>
              If the gear is already augmented/at titan, use the original 5 star
              values (found on the augment screen)
            </Typography>
            <Image
              src="/stat_original_5_star_value_example.jpg"
              alt="stat-original-5-star-value-example"
              width={415}
              height={230}
            />
          </Box>
        )
      }
      additionalAccordions={position === 'GearB' && <GearRollSimulator />}
      data-testid={position}
    />
  ) : (
    <EmptyGearPiece
      onGearTypeSelect={handleGearTypeSelect}
      showGearOCRButton
      onReplaceGear={handleNewGear}
      data-testid={position}
    />
  );
}
