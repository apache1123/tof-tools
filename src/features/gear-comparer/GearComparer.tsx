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

import { GridBreak } from '../../components/GridBreak/GridBreak';
import { BuffSummary } from './BuffSummary';
import { GearComparerOptions } from './GearComparerOptions';
import { LoadoutGear } from './LoadoutGear';
import { LoadoutGearValue } from './LoadoutGearValue';
import { LoadoutStats } from './LoadoutStats';
import { LoadoutTeam } from './LoadoutTeam';
import { ReplacementGear } from './ReplacementGear';
import { ReplacementGearValue } from './ReplacementGearValue';

export function GearComparer() {
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
                aria-controls="loadout-team-panel-content"
                id="loadout-team-panel-header"
              >
                <Typography fontWeight="bold">Weapons & Matrices</Typography>
              </AccordionSummary>
              <AccordionDetails data-testid="loadout-team-panel-content">
                <LoadoutTeam />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded elevation={2}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="loadout-stats-panel-content"
                id="loadout-stats-panel-header"
              >
                <Typography fontWeight="bold">Loadout stats</Typography>
              </AccordionSummary>
              <AccordionDetails data-testid="loadout-stats-panel-content">
                <LoadoutStats />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Typography variant="h5" mb={1}>
                Current gear
              </Typography>
              <LoadoutGear />
            </Grid>
            <Grid xs={12} md={6}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" mb={1}>
                  New gear
                </Typography>
                {/* <GearComparerGearSwap /> */}
              </Box>
              <ReplacementGear />
            </Grid>

            <GridBreak />

            <Grid xs={12} md={6}>
              <LoadoutGearValue />
            </Grid>
            <Grid xs={12} md={6}>
              <ReplacementGearValue />
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <BuffSummary />

          {/* <Accordion defaultExpanded elevation={2} sx={{ mt: 2 }}>
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
          </Accordion> */}
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
