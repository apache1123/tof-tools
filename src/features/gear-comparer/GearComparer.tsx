import { Box, Divider, Link, Paper, Stack, Typography } from "@mui/material";

import { LoadoutSelector } from "../loadouts/LoadoutSelector";
import { LoadoutStats } from "../loadouts/LoadoutStats";
import { LoadoutTeam } from "../loadouts/LoadoutTeam";
import { BuffSummary } from "./BuffSummary";
import { GearsSideBySide } from "./GearsSideBySide";
import { LoadoutTitle } from "./LoadoutTitle";

export function GearComparer() {
  return (
    <>
      <Box mb={3}>
        <LoadoutSelector />
      </Box>

      <Paper sx={{ p: 3 }} square elevation={0}>
        <Stack spacing={4}>
          <LoadoutTitle />
          <LoadoutTeam />
          <LoadoutStats />

          <GearsSideBySide />
        </Stack>
      </Paper>

      <Divider sx={{ my: 5 }} />

      <BuffSummary />

      <Box mt={10} textAlign="center">
        <Typography variant="body2">
          This calculator is based off of <strong>Maygi&apos;s</strong>{" "}
          <Link
            href="https://docs.google.com/spreadsheets/d/1ZrJokNh_0AF_9welc7Etz6K8jlpzi5bXpiWz-mQZa78/edit#gid=1875148939"
            target="_blank"
            rel="noopener"
          >
            {" "}
            Gear Comparison calculator.
          </Link>{" "}
          Go check it out! 😊
        </Typography>
      </Box>
    </>
  );
}
