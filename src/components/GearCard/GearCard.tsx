import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { GearStars } from "../GearStars/GearStars";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";
import { RandomStatDisplay } from "../RandomStatDisplay/RandomStatDisplay";

export interface GearCardProps {
  gear: Gear;
  onClick?: (gear: Gear) => void;
}

export function GearCard({ gear, onClick }: GearCardProps) {
  const { type, isAugmented, randomStats } = gear;

  return (
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(gear);
        }}
      >
        <Stack spacing={1}>
          {/* Header - type and stars */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mr: 1, alignItems: "center" }}
          >
            <GearTypeIcon gearName={type.id} isTitan={isAugmented} />
            <GearStars gear={gear} readOnly />
          </Stack>

          {/* Random stats */}
          <Box sx={{ p: 1 }}>
            {randomStats.length ? (
              <Stack spacing={1}>
                <>
                  {randomStats.map((randomStat, i) => (
                    <RandomStatDisplay key={i} randomStat={randomStat} />
                  ))}
                </>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No random stats
              </Typography>
            )}
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
