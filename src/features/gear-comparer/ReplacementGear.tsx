import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import type { Gear } from '../../models/gear';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearPiece } from '../GearPiece';
import { TitanGearMaxStats } from '../TitanGearMaxStats';
import { GearRollSimulator } from './GearRollSimulator';
import { gearComparerGearMaxTitansState } from './states/derived/gear-comparer-gear-max-titans';

export function ReplacementGear() {
  const {
    replacementGear: gearSnap,
    selectedLoadout: { elementalType },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.replacementGear;

  const maxTitansSnap = useSnapshot(gearComparerGearMaxTitansState);

  return (
    <GearPiece
      gearSnap={gearSnap}
      gearState={gearState}
      onGearTypeChange={(gearType) => {
        gearComparerState.selectedGearTypeId = gearType.id;
      }}
      showGearOCRButton
      showStatSummary={elementalType}
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
            elementalType={elementalType}
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
      additionalAccordions={<GearRollSimulator />}
      data-testid={'replacement-gear'}
    />
  );
}
