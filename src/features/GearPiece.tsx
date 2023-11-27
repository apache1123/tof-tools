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
import type { ReactNode } from 'react';

import { GearStarsSelector } from '../components/GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../components/GearTypeIcon/GearTypeIcon';
import { GearTypeSelector } from '../components/GearTypeSelector/GearTypeSelector';
import type { CoreElementalType } from '../constants/elemental-type';
import { defaultNumOfRandomStats } from '../constants/gear';
import { Gear } from '../models/gear';
import type { GearType } from '../models/gear-type';
import { getPossibleRandomStatTypes } from '../models/gear-type';
import { RandomStat } from '../models/random-stat';
import type { SaveGearModalProps } from './gear-comparer/SaveGearModal';
import { SaveGearModal } from './gear-comparer/SaveGearModal';
import { GearAttackStatsSummary } from './GearAttackStatsSummary';
import { GearOCRModal } from './GearOCRModal';
import { GearRollBreakdown } from './GearRollBreakdown';
import { GearStars } from './GearStars';
import { DisabledStatEditor, EmptyStatEditor, StatEditor } from './StatEditor';

export interface GearPieceProps {
  gearSnap: Gear;
  gearState: Gear;
  showGearOCRButton?: boolean;
  showCompareGearButton?: boolean;
  onCompareGear?(): void;
  disableGearTypeChange?: boolean;
  onGearTypeChange?: (gearType: GearType) => void;
  showSaveGearButton?: Pick<SaveGearModalProps, 'targetLoadout'>;
  showStatSummary?: CoreElementalType;
  maxTitanStatsContent?: ReactNode;
  additionalAccordions?: ReactNode;
  ['data-testid']?: string;
}

export const GearPiece = ({
  gearSnap,
  gearState,
  showGearOCRButton,
  showCompareGearButton,
  onCompareGear,
  disableGearTypeChange,
  onGearTypeChange,
  showSaveGearButton,
  showStatSummary,
  maxTitanStatsContent,
  additionalAccordions,
  'data-testid': dataTestId,
}: GearPieceProps) => {
  const gearType = gearSnap.type;
  const possibleRandomStatTypes = getPossibleRandomStatTypes(gearType);

  return (
    <Layout
      typeIcon={<GearTypeIcon gearName={gearType.id} size={70} />}
      typeSelector={
        <GearTypeSelector
          selectedGearType={gearType}
          onChange={(gearType) => {
            if (onGearTypeChange && !disableGearTypeChange) {
              onGearTypeChange(gearType);
            }
          }}
          disabled={disableGearTypeChange}
        />
      }
      starsSelector={<GearStars gearSnap={gearSnap} gearState={gearState} />}
      randomStats={
        <>
          {gearSnap.randomStats.map((randomStatSnap, i) => {
            return randomStatSnap && gearState.randomStats[i] ? (
              <StatEditor
                key={i}
                statSnap={randomStatSnap}
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
              <IconButton onClick={onCompareGear} color="primary">
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          )}
          {showSaveGearButton && showSaveGearButton.targetLoadout && (
            <SaveGearModal
              gear={gearState}
              targetLoadout={showSaveGearButton.targetLoadout}
            />
          )}
        </>
      }
      summary={
        <>
          {showStatSummary && (
            <GearAttackStatsSummary
              gearSnap={gearSnap as Gear}
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
                <GearRollBreakdown gearSnap={gearSnap} />
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
    <Paper sx={{ p: 2 }} square elevation={2} data-testid={dataTestId}>
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
