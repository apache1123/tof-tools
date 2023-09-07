import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';

import { GridBreak } from '../../components/GridBreak/GridBreak';
import { initializeOCRWorker } from '../../states/ocr-temp-gear';
import { BuffSummary } from './BuffSummary';
import { GearComparerGear } from './GearComparerGear';
import { GearComparerGearSwap } from './GearComparerGearSwap';
import { GearComparerOptions } from './GearComparerOptions';
import { GearValue } from './GearValue';
import { MiscellaneousBuffs } from './MiscellaneousBuffs';
import { Team } from './Team';
import { UserBaseStats } from './UserBaseStats';

export function GearComparer() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <Paper sx={{ p: 2 }} elevation={0}>
        <>
          <Box mb={3}>
            <GearComparerOptions />
          </Box>

          <Box mb={5}>
            <Accordion defaultExpanded elevation={2}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="user-stats-panel-content"
                id="user-stats-panel-header"
              >
                <Typography fontWeight="bold">Your stats</Typography>
              </AccordionSummary>
              <AccordionDetails data-testid="user-stats-panel-content">
                <UserBaseStats />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded elevation={2}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="team-panel-content"
                id="team-panel-header"
              >
                <Typography fontWeight="bold">Weapons & Matrices</Typography>
              </AccordionSummary>
              <AccordionDetails data-testid="team-panel-content">
                <Team />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Typography variant="h5" mb={1}>
                Current gear
              </Typography>
              <GearComparerGear position="GearA" />
            </Grid>
            <Grid xs={12} md={6}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" mb={1}>
                  New gear
                </Typography>
                <GearComparerGearSwap />
              </Box>
              <GearComparerGear position="GearB" />
            </Grid>

            <GridBreak />

            <Grid xs={12} md={6}>
              <GearValue position="GearA" />
            </Grid>
            <Grid xs={12} md={6}>
              <GearValue position="GearB" />
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <BuffSummary />
          <Accordion defaultExpanded elevation={2} sx={{ mt: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="misc-buffs-panel-content"
              id="misc-buffs-panel-header"
            >
              <Typography>Miscellaneous buffs</Typography>
            </AccordionSummary>
            <AccordionDetails data-testid="misc-buffs-panel-content">
              <MiscellaneousBuffs />
            </AccordionDetails>
          </Accordion>
        </>
      </Paper>

      <Box mt={10} textAlign="center">
        <Typography variant="body2">
          This calculator is based off of <strong>Maygi&apos;s</strong>{' '}
          <Link
            href="https://docs.google.com/spreadsheets/d/1ZrJokNh_0AF_9welc7Etz6K8jlpzi5bXpiWz-mQZa78/edit#gid=1875148939"
            target="_blank"
            rel="noopener"
          >
            {' '}
            Gear Comparison calculator.
          </Link>{' '}
          Go check it out! 😊
        </Typography>
      </Box>
    </>
  );
}
