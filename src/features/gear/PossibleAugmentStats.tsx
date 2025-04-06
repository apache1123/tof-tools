import { Box, Typography } from "@mui/material";

import type {
  PossibleAugmentStat,
  PossibleAugmentStats,
} from "../../models/gear/possible-augment-stats";

export interface PossibleAugmentStatsProps {
  possibleAugmentStats: PossibleAugmentStats | undefined;
}

export function PossibleAugmentStats({
  possibleAugmentStats,
}: PossibleAugmentStatsProps) {
  if (
    !possibleAugmentStats ||
    (!possibleAugmentStats.priority.length &&
      !possibleAugmentStats.fallback.length)
  )
    return (
      <Box sx={{ fontSize: (theme) => theme.typography.body2.fontSize }}>
        <Typography sx={{ fontSize: "inherit" }}>
          Possible augmentation stats:
        </Typography>
        <Typography
          component="div"
          sx={{ fontStyle: "italic", fontSize: "inherit" }}
        >
          No possible augmentation stats. Check if random stats are correct.
        </Typography>
      </Box>
    );

  const possibleStatsToString = (possibleAugmentStats: PossibleAugmentStat[]) =>
    possibleAugmentStats
      .map((possibleStat) => possibleStat.type.displayName)
      .join(", ");

  const priorityStatsString = possibleStatsToString(
    possibleAugmentStats.priority,
  );
  const fallbackStatsString = possibleStatsToString(
    possibleAugmentStats.fallback,
  );

  return (
    <Box sx={{ fontSize: (theme) => theme.typography.body2.fontSize }}>
      {possibleAugmentStats.priority.length &&
      possibleAugmentStats.fallback.length ? (
        <>
          <Typography sx={{ fontSize: "inherit" }}>
            Priority possible augmentation stats:
          </Typography>
          <Typography
            sx={{ fontStyle: "italic", fontSize: "inherit" }}
            gutterBottom
          >
            {priorityStatsString}
          </Typography>

          <Typography sx={{ fontSize: "inherit" }}>
            Other possible augmentation stats:
          </Typography>
          <Typography sx={{ fontStyle: "italic", fontSize: "inherit" }}>
            {fallbackStatsString}
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: "inherit" }}>
            Possible augmentation stats:
          </Typography>
          <Typography
            component="div"
            sx={{ fontStyle: "italic", fontSize: "inherit" }}
          >
            {possibleAugmentStats.priority.length
              ? priorityStatsString
              : fallbackStatsString}
          </Typography>
        </>
      )}
    </Box>
  );
}
