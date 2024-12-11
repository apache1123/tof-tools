import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import type { Gear } from "../../../../models/gear/gear";
import { RandomStatDisplay } from "../../stat/RandomStatDisplay/RandomStatDisplay";
import { GearStars } from "../GearStars/GearStars";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearCardProps {
  gear: Gear;
  onClick?: () => void;
}

export function GearCard({ gear, onClick }: GearCardProps) {
  const { type, isAugmented, randomStats } = gear;

  return (
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick();
        }}
        sx={{ height: "100%", display: "flex", alignItems: "flex-start" }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack spacing={1}>
            {/* Header - type and stars */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ pr: 1, alignItems: "center" }}
            >
              <GearTypeIcon id={type.id} isTitan={isAugmented} />
              <GearStars gear={gear} readOnly />
            </Stack>

            {/* Random stats */}
            <Box sx={{ p: 1 }}>
              {randomStats.length ? (
                <Stack spacing={1}>
                  <>
                    {randomStats.map(
                      (randomStat, i) =>
                        randomStat && (
                          <RandomStatDisplay key={i} randomStat={randomStat} />
                        ),
                    )}
                  </>
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  No random stats
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
