import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import type { Gear } from '../../models/gear';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { TitanGearMaxStats } from '../TitanGearMaxStats';
import { gearComparerGearMaxTitansState } from './states/derived/gear-comparer-gear-max-titans';

export function LoadoutGear() {
  const {
    selectedLoadoutGear: gearSnap,
    selectedLoadout: { elementalType },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.selectedLoadoutGear;

  const maxTitansSnap = useSnapshot(gearComparerGearMaxTitansState);

  return (
    <GearPiece
      gearSnap={gearSnap}
      gearState={gearState}
      gearTypeSelector={
        <GearTypeSelector
          selectedValue={{
            gearType: gearSnap.type,
            isTitan: gearSnap.isAugmented,
          }}
          onChange={({ gearType, isTitan }) => {
            gearComparerState.selectedGearTypeId = gearType.id;
            gearComparerState.selectedLoadoutGear.isAugmented = isTitan;
          }}
        />
      }
      actions={
        <GearOCRModal
          onFinalizeGear={(gearFromOCR) => {
            gearComparerState.selectedLoadout.gearSet.setGear(gearFromOCR);
            gearComparerState.selectedGearTypeId = gearFromOCR.type.id;
          }}
        />
      }
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
      data-testid={'loadout-gear'}
    />
  );
}
