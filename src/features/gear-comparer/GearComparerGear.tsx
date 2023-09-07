import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import type { Gear } from '../../models/gear';
import { getPossibleStars, newGear } from '../../models/gear';
import type { GearType } from '../../models/gear-type';
import { EmptyGearPiece, GearPiece } from '../GearPiece';
import { TitanGearMaxStats } from '../TitanGearMaxStats';
import { GearRollSimulator } from './GearRollSimulator';
import { gearComparerGearMaxTitansState } from './states/derived/gear-comparer-gear-max-titans';
import type { GearComparerGearPosition } from './states/gear-comparer-gear';
import { gearComparerGearsState, setGear } from './states/gear-comparer-gear';
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
    const gear = newGear(gearType);
    setGear(position, gear);
  };

  const handleNewGear = (gear: Gear) => {
    setGear(position, gear);
  };

  return gearSnap && gearState ? (
    <GearPiece
      gearState={gearState}
      showGearOCRButton
      showSaveGearButton
      showStatSummary={selectedElementalType}
      maxTitanStatsContent={
        gearSnap.stars !== 5 &&
        getPossibleStars(gearSnap as Gear).length > 1 ? (
          <Typography color="info.main" gutterBottom>
            Can&apos;t determine the number of stars{' '}
            <strong>
              (either {getPossibleStars(gearSnap as Gear).join(' or ')} stars)
            </strong>
            . Select it above to continue
          </Typography>
        ) : gearSnap.stars !== 5 &&
          getPossibleStars(gearSnap as Gear).length === 1 &&
          getPossibleStars(gearSnap as Gear)[0] !== 5 ? (
          <Typography color="info.main" gutterBottom>
            Can&apos;t calculate max titan stat values if gear is not at 5 star
          </Typography>
        ) : gearSnap &&
          maxTitansSnap.titansByReferenceGearId[gearSnap.id] &&
          gearComparerGearMaxTitansState.titansByReferenceGearId[
            gearSnap.id
          ] ? (
          <TitanGearMaxStats
            maxTitanGearState={
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              gearComparerGearMaxTitansState.titansByReferenceGearId[
                gearSnap.id
              ]!
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
      data-test-id={position}
    />
  ) : (
    <EmptyGearPiece
      onGearTypeSelect={handleGearTypeSelect}
      showGearOCRButton
      onReplaceGear={handleNewGear}
      data-test-id={position}
    />
  );
}
