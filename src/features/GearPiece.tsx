import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../components/ElementalStyledText/ElementalStyledText';
import { GearStarsSelector } from '../components/GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../components/GearTypeIcon/GearTypeIcon';
import { GearTypeSelector } from '../components/GearTypeSelector/GearTypeSelector';
import { defaultNumOfRandomStats } from '../constants/gear';
import {
  copyGear,
  type Gear,
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
  getType,
  newGear,
  setStars,
  setType,
} from '../models/gear';
import type { GearType } from '../models/gear-type';
import { getPossibleRandomStatTypes } from '../models/gear-type';
import { newRandomStat } from '../models/random-stat';
import type { CoreElementalType } from '../models/stat-type';
import { toPercentageString2dp } from '../utils/number-utils';
import { SaveGearModal } from './gear-comparer/SaveGearModal';
import {
  gearComparerGearsStore,
  setGear,
} from './gear-comparer/stores/gear-comparer-gear';
import { GearOCRModal } from './GearOCRModal';
import { GearRandomStatsRollsDetails } from './GearRandomStatsRollsDetails';
import { DisabledStatEditor, EmptyStatEditor, StatEditor } from './StatEditor';

export interface GearPieceProps {
  gear: Gear;
  showGearOCRButton?: boolean;
  showCompareGearButton?: boolean;
  disableGearTypeChange?: boolean;
  showSaveGearButton?: boolean;
  showStatSummary?: CoreElementalType;
}

export const GearPiece = ({
  gear,
  showGearOCRButton,
  showCompareGearButton,
  disableGearTypeChange,
  showSaveGearButton,
  showStatSummary,
}: GearPieceProps) => {
  const gearSnap = useSnapshot(gear);

  const gearType = getType(gearSnap as Gear);
  const possibleRandomStatTypes = getPossibleRandomStatTypes(gearType);

  const router = useRouter();
  const handleCompareGear = () => {
    if (gearComparerGearsStore.GearA) {
      copyGear(gear, gearComparerGearsStore.GearA);
    } else {
      const newGearA = newGear(getType(gear));
      copyGear(gear, newGearA);
      setGear('GearA', newGearA);
    }
    router.push('/gear-comparer');
  };

  const totalAttackFlat = showStatSummary
    ? getTotalAttackFlat(gearSnap as Gear, showStatSummary)
    : 0;
  const totalAttackPercent = showStatSummary
    ? getTotalAttackPercent(gearSnap as Gear, showStatSummary)
    : 0;
  const totalCritFlat = getTotalCritFlat(gearSnap as Gear);
  const totalCritPercent = getTotalCritPercent(gearSnap as Gear);
  const totalDamagePercent = showStatSummary
    ? getTotalDamagePercent(gearSnap as Gear, showStatSummary)
    : 0;

  return (
    <Layout
      typeIcon={<GearTypeIcon gearName={gearType.id} size={70} />}
      typeSelector={
        <GearTypeSelector
          selectedGearType={gearType}
          onChange={(gearType) => setType(gear, gearType)}
          disabled={disableGearTypeChange}
        />
      }
      starsSelector={
        <GearStarsSelector
          stars={gearSnap.stars}
          onStarsChange={(stars) => setStars(gear, stars)}
        />
      }
      randomStats={
        <>
          {gearSnap.randomStats.map((randomStat, i) => {
            return randomStat && gear.randomStats[i] ? (
              <StatEditor
                key={i}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                stat={gear.randomStats[i]!}
                possibleStatTypes={possibleRandomStatTypes}
              />
            ) : (
              <EmptyStatEditor
                key={i}
                possibleStatTypes={possibleRandomStatTypes}
                onStatTypeChange={(statType) => {
                  gear.randomStats[i] = newRandomStat(statType);
                }}
              />
            );
          })}
        </>
      }
      additionalActions={
        <>
          {showGearOCRButton && (
            <GearOCRModal
              onFinalizeGear={(replacementGear) => {
                copyGear(replacementGear, gear);
              }}
              enforceGearType={
                disableGearTypeChange ? gearSnap.typeId : undefined
              }
            />
          )}
          {showCompareGearButton && (
            <Tooltip title="Compare gear" placement="right">
              <IconButton onClick={handleCompareGear} color="primary">
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          )}
          {showSaveGearButton && <SaveGearModal gear={gear} />}
        </>
      }
      summary={
        <>
          {showStatSummary && (
            <>
              {!!totalAttackFlat && (
                <Typography>
                  Attack{' '}
                  <ElementalStyledText elementalType={showStatSummary}>
                    {totalAttackFlat}
                  </ElementalStyledText>
                </Typography>
              )}
              {!!totalAttackPercent && (
                <Typography>
                  Attack{' '}
                  <ElementalStyledText elementalType={showStatSummary}>
                    {toPercentageString2dp(totalAttackPercent)}
                  </ElementalStyledText>
                </Typography>
              )}
              {!!totalDamagePercent && (
                <Typography>
                  Damage{' '}
                  <ElementalStyledText elementalType={showStatSummary}>
                    {toPercentageString2dp(totalDamagePercent)}
                  </ElementalStyledText>
                </Typography>
              )}
              {!!totalCritFlat && (
                <Typography>
                  Crit{' '}
                  <ElementalStyledText elementalType={showStatSummary}>
                    {totalCritFlat}
                  </ElementalStyledText>
                </Typography>
              )}
              {!!totalCritPercent && (
                <Typography>
                  Crit{' '}
                  <ElementalStyledText elementalType={showStatSummary}>
                    {toPercentageString2dp(totalCritPercent)}
                  </ElementalStyledText>
                </Typography>
              )}
            </>
          )}
          <Box mt={2} textAlign="right">
            <GearRandomStatsRollsDetails gear={gear} />
          </Box>
        </>
      }
    />
  );
};

export interface EmptyGearPieceProps {
  onGearTypeSelect(gearType: GearType): void;
  showGearOCRButton?: boolean;
  onReplaceGear?(gear: Gear): void;
}

export const EmptyGearPiece = ({
  onGearTypeSelect,
  showGearOCRButton,
  onReplaceGear,
}: EmptyGearPieceProps) => {
  return (
    <Layout
      typeIcon={<GearTypeIcon gearName={undefined} size={80} />}
      typeSelector={
        <GearTypeSelector
          selectedGearType={undefined}
          onChange={onGearTypeSelect}
        />
      }
      starsSelector={<GearStarsSelector stars={0} disabled />}
      randomStats={[...Array(defaultNumOfRandomStats)].map((_, i) => (
        <DisabledStatEditor key={i} />
      ))}
      additionalActions={
        showGearOCRButton && (
          <GearOCRModal
            onFinalizeGear={(gear) => {
              if (onReplaceGear) onReplaceGear(gear);
            }}
          />
        )
      }
      summary={undefined}
    />
  );
};

function Layout({
  typeIcon,
  typeSelector,
  starsSelector,
  randomStats,
  additionalActions,
  summary,
}: {
  typeIcon: ReactNode;
  typeSelector: ReactNode;
  starsSelector: ReactNode;
  randomStats: ReactNode;
  additionalActions: ReactNode;
  summary: ReactNode;
}) {
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2} mb={2}>
        <Grid maxWidth={90} display="flex" alignItems="center">
          {typeIcon}
        </Grid>
        <Grid xs display="flex" flexDirection="column" justifyContent="center">
          {typeSelector}
          <Box mt={1}>
            {starsSelector}
            {starsSelector && (
              <Tooltip title="This is optional and won't affect the calculations if not selected, but will aid the tool in determining the roll details.">
                <InfoOutlinedIcon sx={{ ml: 1 }} />
              </Tooltip>
            )}
          </Box>
        </Grid>
        <Grid display="flex" flexDirection="column">
          {additionalActions}
        </Grid>
      </Grid>
      <Box mb={3}>{randomStats}</Box>
      <Box>{summary}</Box>
    </Paper>
  );
}
