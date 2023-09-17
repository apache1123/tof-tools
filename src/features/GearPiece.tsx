import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

import { GearStarsSelector } from '../components/GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../components/GearTypeIcon/GearTypeIcon';
import { GearTypeSelector } from '../components/GearTypeSelector/GearTypeSelector';
import type { CoreElementalType } from '../constants/elemental-type';
import { defaultNumOfRandomStats } from '../constants/gear';
import { Gear } from '../models/gear';
import type { GearType } from '../models/gear-type';
import { getPossibleRandomStatTypes } from '../models/gear-type';
import { RandomStat } from '../models/random-stat';
import { SaveGearModal } from './gear-comparer/SaveGearModal';
import { gearComparerGearsState } from './gear-comparer/states/gear-comparer-gear';
import { GearAttackStatsSummary } from './GearAttackStatsSummary';
import { GearOCRModal } from './GearOCRModal';
import { GearRollBreakdown } from './GearRollBreakdown';
import { GearStars } from './GearStars';
import { DisabledStatEditor, EmptyStatEditor, StatEditor } from './StatEditor';

export interface GearPieceProps {
  gearState: Gear;
  showGearOCRButton?: boolean;
  showCompareGearButton?: boolean;
  disableGearTypeChange?: boolean;
  showSaveGearButton?: boolean;
  showStatSummary?: CoreElementalType;
  maxTitanStatsContent?: ReactNode;
  additionalAccordions?: ReactNode;
  ['data-testid']?: string;
}

export const GearPiece = ({
  gearState,
  showGearOCRButton,
  showCompareGearButton,
  disableGearTypeChange,
  showSaveGearButton,
  showStatSummary,
  maxTitanStatsContent,
  additionalAccordions,
  'data-testid': dataTestId,
}: GearPieceProps) => {
  const gearSnap = useSnapshot(gearState);

  const gearType = (gearSnap as Gear).type;
  const possibleRandomStatTypes = getPossibleRandomStatTypes(gearType);

  const router = useRouter();
  const handleCompareGear = () => {
    if (gearComparerGearsState.GearA) {
      Gear.copy(gearState, gearComparerGearsState.GearA);
    } else {
      const newGearA = new Gear(gearState.type);
      Gear.copy(gearState, newGearA);
      gearComparerGearsState.GearA = newGearA;
    }
    router.push('/gear-comparer');
  };

  return (
    <Layout
      typeIcon={<GearTypeIcon gearName={gearType.id} size={70} />}
      typeSelector={
        <GearTypeSelector
          selectedGearType={gearType}
          onChange={(gearType) => {
            gearState.type = gearType;
          }}
          disabled={disableGearTypeChange}
        />
      }
      starsSelector={<GearStars gear={gearState} />}
      randomStats={
        <>
          {gearSnap.randomStats.map((randomStatSnap, i) => {
            return randomStatSnap && gearState.randomStats[i] ? (
              <StatEditor
                key={i}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                statState={gearState.randomStats[i]!}
                possibleStatTypes={possibleRandomStatTypes}
              />
            ) : (
              <EmptyStatEditor
                key={i}
                possibleStatTypes={possibleRandomStatTypes}
                onStatTypeChange={(statType) => {
                  gearState.randomStats[i] = new RandomStat(statType);
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
                Gear.copy(replacementGear, gearState);
              }}
              enforceGearType={
                disableGearTypeChange ? gearSnap.type.id : undefined
              }
              iconButton
            />
          )}
          {showCompareGearButton && (
            <Tooltip title="Compare gear" placement="right">
              <IconButton onClick={handleCompareGear} color="primary">
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          )}
          {showSaveGearButton && <SaveGearModal gear={gearState} />}
        </>
      }
      summary={
        <>
          {showStatSummary && (
            <GearAttackStatsSummary
              gearState={gearState}
              elementalType={showStatSummary}
            />
          )}
          <Box mt={2}>
            <Accordion elevation={3}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="roll-breakdown-panel-content"
                id="roll-breakdown-panel-header"
              >
                <Typography>Roll breakdown</Typography>
              </AccordionSummary>
              <AccordionDetails data-testid="roll-breakdown-panel-content">
                <GearRollBreakdown gear={gearState} />
              </AccordionDetails>
            </Accordion>
            {maxTitanStatsContent && (
              <Accordion elevation={3}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="max-titan-stats-panel-content"
                  id="max-titan-stats-panel-header"
                >
                  <Typography>Stat values at max titan</Typography>
                </AccordionSummary>
                <AccordionDetails data-testid="max-titan-stats-panel-content">
                  <>
                    <Typography sx={{ mb: 3 }}>
                      The max increase amount each stat gets at max potential
                      titan (120 augmentations)
                    </Typography>
                    {maxTitanStatsContent}
                  </>
                </AccordionDetails>
              </Accordion>
            )}
            {additionalAccordions}
          </Box>
        </>
      }
      data-testid={dataTestId}
    />
  );
};

export interface EmptyGearPieceProps {
  onGearTypeSelect(gearType: GearType): void;
  showGearOCRButton?: boolean;
  onReplaceGear?(gear: Gear): void;
  ['data-testid']?: string;
}

export const EmptyGearPiece = ({
  onGearTypeSelect,
  showGearOCRButton,
  onReplaceGear,
  'data-testid': dataTestId,
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
      data-testid={dataTestId}
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
  'data-testid': dataTestId,
}: {
  typeIcon: ReactNode;
  typeSelector: ReactNode;
  starsSelector: ReactNode;
  randomStats: ReactNode;
  additionalActions: ReactNode;
  summary: ReactNode;
  ['data-testid']?: string;
}) {
  return (
    <Paper sx={{ p: 2 }} elevation={2} data-testid={dataTestId}>
      <Grid container spacing={2} mb={2}>
        <Grid maxWidth={90} display="flex" alignItems="center">
          {typeIcon}
        </Grid>
        <Grid xs display="flex" flexDirection="column" justifyContent="center">
          {typeSelector}
          <Box mt={1}>{starsSelector}</Box>
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
